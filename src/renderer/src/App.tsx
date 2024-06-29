import { Component, createSignal, For } from 'solid-js'
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
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemLabel,
  ComboboxTrigger
} from '../components/ui/combobox'

const getFileExtension = (fileName) => fileName.split('.').pop()

const App: Component = () => {
  const [fileExtensions, setFileExtensions] = createSignal<string[]>([])
  const [selectedExtension, setSelectedExtension] = createSignal('')

  window.electron.ipcRenderer.on('open-file-reply', (_event, response) => {
    if (!response.canceled && !response.error) {
      setFileExtensions((prevExtensions) => {
        const newExtensions = [...prevExtensions, getFileExtension(response.fileName)]
        return newExtensions
      })
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
                <Combobox
                  class="!text-white"
                  options={fileExtensions().map((ext) => ({ value: ext, label: ext }))}
                  placeholder="Primary Language"
                  onVolumeChange={(value) => {
                    setSelectedExtension(value)
                  }}
                  itemComponent={(props) => (
                    <ComboboxItem item={props.item}>
                      <ComboboxItemLabel class="!text-white">
                        {props.item.rawValue.label}
                      </ComboboxItemLabel>
                      <ComboboxItemIndicator />
                    </ComboboxItem>
                  )}
                >
                  <ComboboxControl>
                    <ComboboxInput value={selectedExtension()} />
                    <ComboboxTrigger />
                  </ComboboxControl>
                  <ComboboxContent />
                </Combobox>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </For>
      </div>
    </div>
  )
}

export default App
