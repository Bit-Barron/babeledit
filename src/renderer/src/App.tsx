import { type Component } from 'solid-js'

const App: Component = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('open-file')

  return (
    <div>
      <div class="flex items-center justify-center w-full">
        <h1>Upload Json File</h1>
        <form>
          <input type="file" onChange={ipcHandle} />
        </form>
      </div>
    </div>
  )
}

export default App
