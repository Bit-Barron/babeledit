import { type Component } from 'solid-js'
import { For } from 'solid-js'
import { NavbarIcon, navbarIconNames } from './utils/clientHelper'

const App: Component = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('open-file')

  const navIcons: NavbarIcon[] = navbarIconNames.map((name) => ({
    name,
    icon: '',
    current: false
  }))

  const getItem = (item: NavbarIcon) => {
    console.log(item)
  }

  return (
    <div>
      <For each={navIcons}>{(item) => <div class='' onClick={() => getItem(item)}>{item.name}</div>}</For>
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
