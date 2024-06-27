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
