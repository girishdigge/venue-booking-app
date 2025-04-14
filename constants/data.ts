export const MenuItems = [
  {
    title: 'MENU',
    items: [
      {
        icon: '/home.png',
        label: 'Home',
        href: '/',
      },
      {
        icon: '/admin.png',
        label: 'Admin',
        href: '/admin',
      },
      {
        icon: '/manager.png',
        label: 'Manager',
        href: '/manager',
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        icon: '/profile.png',
        label: 'Profile',
        href: '/profile',
      },
      {
        icon: '/settings.png',
        label: 'Settings',
        href: '/settings',
      },
      {
        icon: '/logout.png',
        label: 'Logout',
        href: '/logout',
      },
    ],
  },
];
export const eventsData = [
  {
    id: 1,
    title: 'Lake Trip',
    class: '1A',
    date: '2025-04-04',
    startTime: '10:00',
    endTime: '11:00',
  },
];

export const announcementsData = [
  {
    id: 1,
    title: 'About 4A Math Test',
    class: '4A',
    date: '2025-04-04',
  },
];

export const calendarEvents = [
  {
    title: 'Math',
    allDay: false,
    start: new Date(2025, 4, 4, 8, 0),
    end: new Date(2025, 4, 4, 8, 45),
  },
];
