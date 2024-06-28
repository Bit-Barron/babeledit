import { Component, createSignal, Show } from 'solid-js'
import { FiUploadCloud } from 'solid-icons/fi'

export const [uploadedFiles, setUploadedFiles] = createSignal<{ name: string; path: string }[]>([])

export const Dropzone: Component = () => {
  const ipcHandle = (): void => {
    window.electron.ipcRenderer.send('open-file')
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer!.dropEffect = 'copy'
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer!.files)

    window.electron.ipcRenderer.send('open-file', files)

    const uploadedFiles = files.map((file) => ({
      name: file.name,
      path: file.path
    }))
    setUploadedFiles(uploadedFiles)
  }

  return (
    <div
      class="flex items-center justify-center w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={ipcHandle}
    >
      <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <FiUploadCloud class="text-xl" />

          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <Show when={uploadedFiles().length === 0}>Drop your language file here</Show>
            <Show when={uploadedFiles().length > 0}>
              <div class="">
                {uploadedFiles().length === 1 ? (
                  <div class="!flex !justify-center !items-center">{uploadedFiles()[0].path}</div>
                ) : (
                  `Files selected: ${uploadedFiles().length}`
                )}
              </div>
            </Show>
          </p>
        </div>
        <input type="file" class="hidden" />
      </label>
    </div>
  )
}
