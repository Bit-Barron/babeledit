import { type Component } from 'solid-js'
import { NavbarIcon, navbarIconNames } from '../utils/clientHelper'
import { For } from 'solid-js'

export const Navbar: Component = () => {
  const navIcons: NavbarIcon[] = navbarIconNames.map((name) => ({
    name,
    icon: '',
    current: false
  }))

  return (
    <div class="flex space-x-4">
      <For each={navIcons}>
        {(item) => (
          <div class="flex" onClick={() => console.log(item)}>
            {item.name}
          </div>
        )}
      </For>
    </div>
  )
}
