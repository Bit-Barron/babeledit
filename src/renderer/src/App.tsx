import { Component, For, createSignal } from 'solid-js'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../components/ui/alert-dialog'
import { Dropzone } from '../components/ui/dropzone'
import { Button } from '../components/ui/button'
import { DASHBOARD_TABS } from '../utils/clientHelper'

const App: Component = () => {
  const [fileExtensions, setFileExtensions] = createSignal<string[]>([])

  window.electron.ipcRenderer.on('open-file-reply', (_event, response) => {
    if (!response.canceled && !response.error) {
      setFileExtensions((prevExtensions) => [...prevExtensions, response.fileName])
    }
  })

  return (
    <div>
      <h1 class="text-2xl font-bold">Create a new translation project:</h1>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <For each={DASHBOARD_TABS}>
          {(tab) => (
            <AlertDialog>
              <AlertDialogTrigger class="border p-2 rounded-lg">
                <tab.icon class="mx-auto text-2xl" />
                {tab.name}
              </AlertDialogTrigger>
              <AlertDialogContent class="">
                <AlertDialogTitle>Configure Languages</AlertDialogTitle>
                <AlertDialogDescription>
                  Add or remove languages and their corresponding translation files:
                </AlertDialogDescription>
                <Dropzone />
                <div class="flex space-x-3">
                  <Button variant="destructive">Remove Language</Button>
                </div>
                <Button class="w-full" variant="secondary">
                  Finish
                </Button>

                <span>Primary Language</span>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </For>
      </div>
    </div>
  )
}

export default App
