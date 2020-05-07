export default {
  top: [
    {
      name: 'Home',
      url: '/demo/home',
      icon: 'Home',
    },
    {
      name: 'UI Elements',
      icon: 'Layers',
      children: [
        {
          name: 'Buttons',
          url: '/demo/elements/buttons',
        },
        {
          name: 'Grid',
          url: '/demo/elements/grid',
        },
        {
          name: 'Alerts',
          url: '/demo/elements/alerts',
        },
        {
          name: 'Typography',
          url: '/demo/elements/typography',
        },
        {
          name: 'Cards',
          url: '/demo/elements/cards',
        },
        {
          name: 'Tabs',
          url: '/demo/elements/tabs',
        },
        {
          name: 'Tables',
          url: '/demo/elements/tables',
        },
        {
          name: 'Breadcrumbs',
          url: '/demo/elements/breadcrumbs',
        },
        {
          name: 'Forms',
          url: '/demo/elements/forms',
        },
        {
          name: 'Modals',
          url: '/demo/elements/modals',
        },
        {
          name: 'Loaders',
          url: '/demo/elements/loaders',
        },
        {
          name: 'Avatars',
          url: '/demo/elements/avatars',
        },
        {
          name: 'Progress Bars',
          url: '/demo/elements/progressbars',
        },
        {
          name: 'Pagination',
          url: '/demo/elements/pagination',
        },
      ],
    },
    {
      name: 'Pages',
      icon: 'File',
      children: [
        {
          name: 'Blank',
          url: '/demo/pages/blank',
        },
        {
          name: 'Sub Navigation',
          url: '/demo/pages/subnav',
        },
        {
          name: '404',
          url: '/demo/pages/404',
        },
      ],
    },
    {
      name: 'Apps',
      icon: 'Cloud',
      children: [
        {
          name: 'Analytics',
          url: '/demo/apps/analytics',
        },
        {
          name: 'Invoice',
          url: '/demo/apps/invoice',
        },
        {
          name: 'Activity Feed',
          url: '/demo/apps/feed',
        },
        {
          name: 'CMS',
          url: '/demo/apps/cms',
        },
      ],
    },
    {
      divider: true,
    },
    {
      name: 'Widgets',
      url: '/demo/widgets',
      icon: 'Package',
      badge: {
        text: 'NEW',
      },
    },
  ],
  bottom: [
    {
      name: 'Get Vibe',
      url: 'https://github.com/NiceDash/Vibe',
      icon: 'GitHub',
      external: true,
      target: '_blank',
    },
    {
      name: 'Account',
      url: '/demo/dashboard',
      icon: 'User',
      badge: {
        variant: 'success',
        text: '3',
      },
    },
  ],
};
