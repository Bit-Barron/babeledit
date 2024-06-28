import { Component } from 'solid-js'
import { FiUploadCloud } from 'solid-icons/fi'

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
    console.log('Files dropped:', files)

    window.electron.ipcRenderer.send('open-file', files)
  }

  return (
    <div
      class="flex items-center justify-center w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={ipcHandle}
    >
      <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <FiUploadCloud class="text-xl" />

          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Drop your language file here</p>
        </div>
        <input type="file" class="hidden" />
      </label>
    </div>
  )
}
