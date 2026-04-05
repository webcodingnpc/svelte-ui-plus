/**
 * SvelteUI 文档展示页构建脚本
 * 生成独立的 HTML 文件，可直接在 GitHub Pages 托管
 */
import esbuild from 'esbuild'
import { compile, preprocess } from 'svelte/compiler'
import { transform } from 'esbuild'
import * as sass from 'sass'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SHOWCASE_DIR = path.resolve(ROOT, '..', 'viteSvelte', 'src', 'views')
const DOCS_DIR = path.join(ROOT, 'docs')

/** 别名插件：将 'svelte-ui-plus' 解析到本地源码 */
function aliasPlugin() {
    return {
        name: 'alias',
        setup(build) {
            // svelte-ui-plus/utils/icons → 本地 utils/icons.ts
            build.onResolve({ filter: /^svelte-ui-plus\/(.+)$/ }, (args) => {
                const sub = args.path.replace('svelte-ui-plus/', '')
                const resolved = path.resolve(ROOT, sub)
                // 尝试 .ts / .js / /index.ts
                for (const ext of ['', '.ts', '.js', '/index.ts', '/index.js']) {
                    const full = resolved + ext
                    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
                        return { path: full }
                    }
                }
                return { path: resolved }
            })

            // svelte-ui-plus → 本地 index.ts
            build.onResolve({ filter: /^svelte-ui-plus$/ }, () => ({
                path: path.resolve(ROOT, 'index.ts'),
            }))
        },
    }
}

/** esbuild 插件：编译 .svelte 文件 */
function sveltePlugin() {
    return {
        name: 'svelte',
        setup(build) {
            build.onResolve({ filter: /\.svelte$/ }, (args) => ({
                path: path.isAbsolute(args.path)
                    ? args.path
                    : path.resolve(args.resolveDir, args.path),
                namespace: 'file',
            }))

            build.onLoad({ filter: /\.svelte$/ }, async (args) => {
                const source = fs.readFileSync(args.path, 'utf-8')
                const filename = args.path

                const preprocessed = await preprocess(source, [
                    {
                        script: async ({ content, attributes }) => {
                            if (attributes.lang !== 'ts') return
                            const result = await transform(content, {
                                loader: 'ts',
                                tsconfigRaw: '{ "compilerOptions": { "verbatimModuleSyntax": true } }',
                            })
                            return { code: result.code }
                        },
                    },
                    {
                        style: ({ content, attributes }) => {
                            if (attributes.lang !== 'scss') return
                            const result = sass.compileString(content, {
                                loadPaths: [path.dirname(filename), path.join(ROOT, 'styles')],
                            })
                            return { code: result.css }
                        },
                    },
                ], { filename })

                const compiled = compile(preprocessed.code, {
                    filename,
                    generate: 'client',
                    css: 'injected',
                    runes: true,
                    dev: false,
                })

                for (const w of compiled.warnings) {
                    if (w.code?.startsWith('a11y_') || w.code === 'state_referenced_locally') continue
                    console.warn(`[svelte] ${path.relative(ROOT, filename)}: ${w.message}`)
                }

                return {
                    contents: compiled.js.code,
                    loader: 'js',
                    resolveDir: path.dirname(args.path),
                }
            })
        },
    }
}

/** esbuild 插件：编译 .scss 文件 */
function scssPlugin() {
    return {
        name: 'scss',
        setup(build) {
            build.onResolve({ filter: /\.scss$/ }, (args) => ({
                path: path.isAbsolute(args.path)
                    ? args.path
                    : path.resolve(args.resolveDir, args.path),
                namespace: 'file',
            }))

            build.onLoad({ filter: /\.scss$/ }, (args) => {
                const result = sass.compile(args.path, {
                    loadPaths: [path.dirname(args.path), path.join(ROOT, 'styles')],
                })
                return {
                    contents: result.css,
                    loader: 'css',
                    resolveDir: path.dirname(args.path),
                }
            })
        },
    }
}

// 创建临时入口文件
const entryFile = path.join(ROOT, '_docs-entry.js')
fs.writeFileSync(entryFile, `
import { mount } from 'svelte'
import App from '${SHOWCASE_DIR.replace(/\\/g, '/')}/ComponentShowcase.svelte'

const app = mount(App, { target: document.getElementById('app') })
export default app
`)

console.log('🔨 构建文档展示页...\n')

try {
    // 构建 JS + CSS
    const result = await esbuild.build({
        entryPoints: [entryFile],
        bundle: true,
        format: 'esm',
        minify: true,
        target: 'esnext',
        write: false,
        plugins: [aliasPlugin(), sveltePlugin(), scssPlugin()],
        outdir: 'out',
    })

    let jsCode = ''
    let cssCode = ''

    for (const file of result.outputFiles) {
        if (file.path.endsWith('.js')) {
            jsCode = file.text
        } else if (file.path.endsWith('.css')) {
            cssCode = file.text
        }
    }

    // 生成独立 HTML
    const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SvelteUI 组件展示 — 基于 Svelte 5 的 UI 组件库</title>
  <meta name="description" content="SvelteUI Plus 是基于 Svelte 5 Runes 的 UI 组件库，提供 78+ 组件。" />
  <style>${cssCode}</style>
</head>
<body>
  <div id="app"></div>
  <script type="module">${jsCode}<\/script>
</body>
</html>`

    // 写入
    fs.mkdirSync(DOCS_DIR, { recursive: true })
    const outPath = path.join(DOCS_DIR, 'index.html')
    fs.writeFileSync(outPath, html)

    const sizeKB = (Buffer.byteLength(html) / 1024).toFixed(1)
    console.log(`✅ 文档展示页构建完成！`)
    console.log(`  docs/index.html — ${sizeKB} KB`)
} finally {
    // 清理临时文件
    if (fs.existsSync(entryFile)) fs.unlinkSync(entryFile)
}
