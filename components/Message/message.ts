/**
 * Message 函数式调用 API
 *
 * 用法:
 *   import { message } from 'svelte-ui'
 *   message.success('操作成功')
 *   message.error('操作失败')
 *   message.warning('请注意')
 *   message.info('提示信息')
 */
import { mount, unmount } from 'svelte'
import MessageComponent from './Message.svelte'

interface MessageOptions {
    /** 消息内容 */
    message: string
    /** 消息类型 */
    type?: 'success' | 'warning' | 'info' | 'danger'
    /** 显示时长(ms)，0 则不自动关闭 */
    duration?: number
    /** 是否显示关闭按钮 */
    showClose?: boolean
}

// 实例管理
let instances: { id: number; container: HTMLElement; component: any; height: number }[] = []
let seed = 0

// 计算偏移量
function getVerticalOffset(index: number): number {
    let offset = 16
    for (let i = 0; i < index; i++) {
        offset += instances[i].height + 16
    }
    return offset
}

// 更新所有实例位置
function updatePositions() {
    instances.forEach((inst, i) => {
        const offset = getVerticalOffset(i)
        const el = inst.container.querySelector('.su-message') as HTMLElement
        if (el) el.style.top = `${offset}px`
    })
}

function createMessage(options: MessageOptions) {
    const id = seed++
    const container = document.createElement('div')
    document.body.appendChild(container)

    const index = instances.length
    const offset = getVerticalOffset(index)

    const closeMessage = () => {
        const idx = instances.findIndex((inst) => inst.id === id)
        if (idx === -1) return
        instances.splice(idx, 1)
        updatePositions()
        try {
            unmount(component)
        } catch {
            // 已卸载
        }
        container.remove()
    }

    const component = mount(MessageComponent, {
        target: container,
        props: {
            type: options.type || 'info',
            message: options.message,
            offset,
            showClose: options.showClose || false,
            onclose: closeMessage,
        },
    })

    const inst = { id, container, component, height: 48 }
    instances.push(inst)

    // 自动关闭
    const duration = options.duration ?? 3000
    if (duration > 0) {
        setTimeout(closeMessage, duration)
    }

    return { close: closeMessage }
}

// 导出便捷方法
export const message = {
    success(msg: string, options?: Partial<MessageOptions>) {
        return createMessage({ message: msg, type: 'success', ...options })
    },
    warning(msg: string, options?: Partial<MessageOptions>) {
        return createMessage({ message: msg, type: 'warning', ...options })
    },
    info(msg: string, options?: Partial<MessageOptions>) {
        return createMessage({ message: msg, type: 'info', ...options })
    },
    error(msg: string, options?: Partial<MessageOptions>) {
        return createMessage({ message: msg, type: 'danger', ...options })
    },
    danger(msg: string, options?: Partial<MessageOptions>) {
        return createMessage({ message: msg, type: 'danger', ...options })
    },
}

export type { MessageOptions }
