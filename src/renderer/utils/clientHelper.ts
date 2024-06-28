import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
