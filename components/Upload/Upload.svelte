<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface UploadFile {
    name: string
    status: 'ready' | 'uploading' | 'success' | 'fail'
    percentage?: number
    url?: string
    uid: number
    raw?: File
  }

  interface Props {
    action?: string
    headers?: Record<string, string>
    multiple?: boolean
    data?: Record<string, string>
    name?: string
    withCredentials?: boolean
    accept?: string
    limit?: number
    disabled?: boolean
    drag?: boolean
    listType?: 'text' | 'picture' | 'picture-card'
    autoUpload?: boolean
    fileList?: UploadFile[]
    showFileList?: boolean
    onchange?: (file: UploadFile, fileList: UploadFile[]) => void
    onremove?: (file: UploadFile, fileList: UploadFile[]) => void
    onsuccess?: (response: any, file: UploadFile, fileList: UploadFile[]) => void
    onerror?: (error: Error, file: UploadFile, fileList: UploadFile[]) => void
    onexceed?: (files: FileList, fileList: UploadFile[]) => void
    beforeUpload?: (file: File) => boolean | Promise<boolean>
    children?: Snippet
    tip?: Snippet
    class?: string
  }

  const ns = useNamespace('upload')
  let {
    action = '',
    headers,
    multiple = false,
    data,
    name = 'file',
    withCredentials = false,
    accept = '',
    limit,
    disabled = false,
    drag = false,
    listType = 'text',
    autoUpload = true,
    fileList = $bindable([]),
    showFileList = true,
    onchange,
    onremove,
    onsuccess,
    onerror,
    onexceed,
    beforeUpload,
    children,
    tip,
    class: className = '',
  }: Props = $props()

  let inputRef: HTMLInputElement | undefined = $state()
  let dragOver = $state(false)
  let uid = $state(0)

  let classes = $derived(
    [ns.b(), ns.m(listType), ns.is('disabled', disabled), ns.is('drag', drag), className]
      .filter(Boolean)
      .join(' ')
  )

  function triggerInput() {
    if (disabled) return
    inputRef?.click()
  }

  async function handleFiles(files: FileList) {
    if (limit && fileList.length + files.length > limit) {
      onexceed?.(files, fileList)
      return
    }

    for (const file of Array.from(files)) {
      if (beforeUpload) {
        const result = await beforeUpload(file)
        if (!result) continue
      }

      const uploadFile: UploadFile = {
        name: file.name,
        status: 'ready',
        uid: ++uid,
        raw: file,
        url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      }

      fileList = [...fileList, uploadFile]
      onchange?.(uploadFile, fileList)

      if (autoUpload) {
        uploadRequest(uploadFile, file)
      }
    }
  }

  function uploadRequest(uploadFile: UploadFile, file: File) {
    if (!action) return
    const formData = new FormData()
    formData.append(name, file)
    if (data) {
      Object.entries(data).forEach(([k, v]) => formData.append(k, v))
    }

    uploadFile.status = 'uploading'
    fileList = [...fileList]

    const xhr = new XMLHttpRequest()
    xhr.open('POST', action, true)
    if (withCredentials) xhr.withCredentials = true
    if (headers) {
      Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v))
    }

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        uploadFile.percentage = Math.round((e.loaded / e.total) * 100)
        fileList = [...fileList]
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        uploadFile.status = 'success'
        fileList = [...fileList]
        onsuccess?.(JSON.parse(xhr.responseText), uploadFile, fileList)
      } else {
        uploadFile.status = 'fail'
        fileList = [...fileList]
        onerror?.(new Error(`Upload failed: ${xhr.status}`), uploadFile, fileList)
      }
    }

    xhr.onerror = () => {
      uploadFile.status = 'fail'
      fileList = [...fileList]
      onerror?.(new Error('Upload error'), uploadFile, fileList)
    }

    xhr.send(formData)
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement
    if (target.files) {
      handleFiles(target.files)
    }
    target.value = ''
  }

  function removeFile(file: UploadFile) {
    fileList = fileList.filter((f) => f.uid !== file.uid)
    onremove?.(file, fileList)
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    dragOver = false
    if (disabled) return
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    dragOver = true
  }

  function handleDragLeave() {
    dragOver = false
  }
</script>

<div class={classes}>
  {#if drag}
    <div
      class="{ns.e('dragger')} {dragOver ? 'is-dragover' : ''}"
      onclick={triggerInput}
      ondrop={handleDrop}
      ondragover={handleDragOver}
      ondragleave={handleDragLeave}
    >
      {#if children}
        {@render children()}
      {:else}
        <div class={ns.e('drag-content')}>
          <Icon name="plus" size={40} />
          <div class={ns.e('text')}>将文件拖到此处，或<em>点击上传</em></div>
        </div>
      {/if}
    </div>
  {:else if listType === 'picture-card'}
    <div class={ns.e('trigger-card')} onclick={triggerInput}>
      {#if children}
        {@render children()}
      {:else}
        <Icon name="plus" size={28} />
      {/if}
    </div>
  {:else}
    <div class={ns.e('trigger')} onclick={triggerInput}>
      {#if children}
        {@render children()}
      {:else}
        <button class={ns.e('btn')} type="button" {disabled}>点击上传</button>
      {/if}
    </div>
  {/if}

  <input
    bind:this={inputRef}
    type="file"
    {accept}
    {multiple}
    onchange={handleInputChange}
    class={ns.e('input')}
  />

  {#if tip}
    <div class={ns.e('tip')}>
      {@render tip()}
    </div>
  {/if}

  {#if showFileList && fileList.length > 0}
    <ul class={ns.e('list')}>
      {#each fileList as file}
        <li class="{ns.e('list-item')} {ns.is(file.status, true)}">
          {#if listType === 'picture' || listType === 'picture-card'}
            {#if file.url}
              <img src={file.url} alt={file.name} class={ns.e('list-item-thumb')} />
            {:else}
              <span class={ns.e('list-item-icon')}>
                <Icon name="edit" size={24} />
              </span>
            {/if}
          {:else}
            <Icon name="edit" size={14} />
          {/if}
          <span class={ns.e('list-item-name')}>{file.name}</span>
          {#if file.status === 'uploading'}
            <div class={ns.e('list-item-progress')}>
              <div class={ns.e('list-item-progress-bar')} style="width: {file.percentage || 0}%"></div>
            </div>
          {/if}
          <span class={ns.e('list-item-close')} onclick={() => removeFile(file)}>
            <Icon name="close" size={14} />
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .su-upload {
    &__input {
      display: none;
    }

    &__trigger,
    &__trigger-card {
      display: inline-block;
    }

    &__trigger-card {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 148px;
      height: 148px;
      border: 1px dashed var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      color: var(--su-text-color-secondary);
      transition: border-color var(--su-transition-duration-fast);

      &:hover {
        border-color: var(--su-color-primary);
        color: var(--su-color-primary);
      }
    }

    &__btn {
      padding: 8px 16px;
      background: var(--su-color-primary);
      color: #fff;
      border: none;
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      font-size: var(--su-font-size-base);
      transition: background var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-color-primary-light-3);
      }

      &:disabled {
        background: var(--su-color-primary-light-5);
        cursor: not-allowed;
      }
    }

    &__dragger {
      width: 100%;
      padding: 40px 0;
      border: 1px dashed var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      text-align: center;
      cursor: pointer;
      background: var(--su-fill-color-blank);
      transition: border-color var(--su-transition-duration-fast);

      &:hover,
      &.is-dragover {
        border-color: var(--su-color-primary);
      }
    }

    &__drag-content {
      color: var(--su-text-color-secondary);
    }

    &__text {
      font-size: var(--su-font-size-small);
      margin-top: 8px;

      em {
        color: var(--su-color-primary);
        font-style: normal;
      }
    }

    &__tip {
      font-size: var(--su-font-size-small);
      color: var(--su-text-color-secondary);
      margin-top: 8px;
    }

    &__list {
      list-style: none;
      padding: 0;
      margin: 8px 0 0;
    }

    &__list-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: var(--su-border-radius-base);
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      transition: background var(--su-transition-duration-fast);
      position: relative;

      &:hover {
        background: var(--su-fill-color-light);
      }

      &.is-success {
        color: var(--su-color-success);
      }

      &.is-fail {
        color: var(--su-color-danger);
      }
    }

    &__list-item-thumb {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: var(--su-border-radius-small);
    }

    &__list-item-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__list-item-close {
      display: none;
      cursor: pointer;
      color: var(--su-text-color-secondary);

      &:hover {
        color: var(--su-color-primary);
      }
    }

    &__list-item:hover &__list-item-close {
      display: inline-flex;
    }

    &__list-item-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--su-border-color-lighter);

      &-bar {
        height: 100%;
        background: var(--su-color-primary);
        transition: width 0.3s;
      }
    }

    &.is-disabled {
      cursor: not-allowed;

      .su-upload__trigger,
      .su-upload__trigger-card,
      .su-upload__dragger {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
</style>
