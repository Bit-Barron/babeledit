import { VsJson } from 'solid-icons/vs'
import { BsFiletypeYml } from 'solid-icons/bs'
import { FaBrandsJava } from 'solid-icons/fa'
import { BiLogosFlutter } from 'solid-icons/bi'
import { SiCsharp } from 'solid-icons/si'
import { FaBrandsAngular } from 'solid-icons/fa'

export const navbarIconNames = [
  'Open project',
  'Save Project',
  'Settings',
  'Languages',
  'Show source'
] as const

export type NavbarIconName = (typeof navbarIconNames)[number]

export type NavbarIcon = {
  name: NavbarIconName
  icon: string
  current: boolean
}

export type DashboardTabs = {
  name: string
  icon: any
}

export const DASHBOARD_TABS: DashboardTabs[] = [
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
