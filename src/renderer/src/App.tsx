import { For, type Component } from 'solid-js'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '../components/Dialog'
import { Dropzone } from '../components/Dropzone'

interface Options {
  name: string
  icon: any
  current: boolean
}

const App: Component = () => {
  // 

  const options: Options[] = [
    {
      name: 'Generic Json',
      icon: '',
      current: true
    },
    {
      name: 'Generic YAML',
      icon: '',
      current: false
    },
    {
      name: 'vue-i18n JSON',
      icon: '',
      current: false
    }
  ]

  return (
    <div>
      <h1 class="text-2xl font-bold">Create a new translation project:</h1>
      <div class="flex mt-2 space-x-4">
        <For each={options}>
          {(tab) => (
            <AlertDialog>
              <AlertDialogTrigger class="border p-2 rounded-lg">{tab.name}</AlertDialogTrigger>
              <AlertDialogContent>
                <Dropzone />
              </AlertDialogContent>
            </AlertDialog>
          )}
        </For>
      </div>
    </div>
  )
}

export default App
