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
import { DashboardTabs } from '../utils/clientHelper'
import { VsJson } from 'solid-icons/vs'
import { BsFiletypeYml } from 'solid-icons/bs'
import { FaBrandsJava } from 'solid-icons/fa'
import { BiLogosFlutter } from 'solid-icons/bi'
import { SiCsharp } from 'solid-icons/si'
import { FaBrandsAngular } from 'solid-icons/fa'

const DASHBOARD_TABS: DashboardTabs[] = [
  {
    name: 'Generic JSON',
    icon: VsJson
  },
  {
    name: 'Generic YAML',
    icon: BsFiletypeYml
  },
  {
    name: 'jave.properties',
    icon: FaBrandsJava
  },
  {
    name: 'Flutter ARB',
    icon: BiLogosFlutter
  },
  {
    name: '.resx Resource',
    icon: SiCsharp
  },
  {
    name: 'Angular',
    icon: FaBrandsAngular
  }
]

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
              <AlertDialogContent class="bg-gray-800">
                <AlertDialogTitle>Configure Languages</AlertDialogTitle>
                <AlertDialogDescription>
                  Add or remove languages and thir corresponding translation files:
                </AlertDialogDescription>
                <Dropzone />
                <div class="flex space-x-3">
                  <Button variant="secondary" class="border hover:bg-gray-600">
                    Add Language
                  </Button>
                  <Button variant="destructive" class="bg-red-400 hover:bg-red-500 !text-black">
                    Remove Language
                  </Button>
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
