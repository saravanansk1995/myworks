export interface Sidenav {
  route: string;
  title: string;
  icon: string;
}

export const sideNavItems: Sidenav[] = [
  {
    route: '/',
    title: 'View Posts',
    icon: 'remove_red_eye'
  },
  {
    route: '/post-create',
    title: 'Create Post',
    icon: 'add_comment'
  }
]

export const layoutConfig = {
  toolbarColor: '#3f51b5',
  toolbarTitle: 'My  Blog',
  toolbarMode: 'fixed',

  sidenavMode: 'push',
  sidenavBgColor: 'white',
  sidenavPosition: 'start'
}
