import { For, type Component } from 'solid-js'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../components/ui/Dialog'
import { Dropzone } from '../components/ui/Dropzone'
import { Button } from '../components/ui/Button'
import { DASHBOARD_TABS } from '../utils/clientHelper'

const App: Component = () => {
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
                  Add or remove languages and thir corresponding translation files:
                </AlertDialogDescription>
                <Dropzone />
                <div class="flex justify-between space-x-3">
                  <Button>Add Language</Button>
                  <Button variant="destructive">Remove Language</Button>
                </div>

                <Button class="w-full" variant="secondary">
                  Finish
                </Button>
                <div class="flex">
                  <div>Primary Language: </div>
                  <button>De</button>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </For>
      </div>
    </div>
  )
}

export default App
