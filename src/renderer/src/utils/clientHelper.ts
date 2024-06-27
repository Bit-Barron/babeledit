export const navbarIconNames = ['Open project', 'Save Project', 'Settings'] as const;

export type NavbarIconName = (typeof navbarIconNames)[number];

export type NavbarIcon = {
  name: NavbarIconName;
  icon: string;
  current: boolean;
};