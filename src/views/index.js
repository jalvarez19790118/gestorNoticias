import Dashboard from './pages/Dashboard';
import Buttons from './elements/Buttons';
import Alerts from './elements/Alerts';
import Grid from './elements/Grid';
import Typography from './elements/Typography';
import Cards from './elements/Cards';
import Tabs from './elements/Tabs';
import Tables from './elements/Tables';
import Breadcrumbs from './elements/Breadcrumbs';
import Forms from './elements/Forms';
import Loaders from './elements/Loaders';
import Avatars from './elements/Avatars';
import Invoice from './pages/Invoice';

import CmsPage from './pages/Cms';

import BlankPage from './pages/BlankPage';
import SubNav from './pages/SubNav';
import Feed from './pages/Feed';
import Modals from './elements/Modals';
import ProgressBars from './elements/ProgressBars';
import PaginationPage from './elements/Pagination';
import ErrorPage from './pages/404';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Dashboard',
    path: '/demo/demo/home',
    component: Dashboard,
  },
  {
    name: 'Buttons',
    path: '/demo/demo/elements/buttons',
    component: Buttons,
  },
  
  {
    name: 'Grid',
    path: '/demo/elements/grid',
    component: Grid,
  },
  {
    name: 'Typography',
    path: '/demo/elements/typography',
    component: Typography,
  },
  {
    name: 'Cards',
    path: '/demo/elements/cards',
    component: Cards,
  },
  {
    name: 'Tabs',
    path: '/demo/elements/tabs',
    component: Tabs,
  },
  {
    name: 'Tables',
    path: '/demo/elements/tables',
    component: Tables,
  },
  {
    name: 'Progress Bars',
    path: '/demo/elements/progressbars',
    component: ProgressBars,
  },
  {
    name: 'Pagination',
    path: '/demo/elements/pagination',
    component: PaginationPage,
  },
  {
    name: 'Modals',
    path: '/demo/elements/modals',
    component: Modals,
  },
  {
    name: 'Breadcrumbs',
    path: '/demo/elements/breadcrumbs',
    component: Breadcrumbs,
  },
  {
    name: 'Forms',
    path: '/demo/elements/forms',
    component: Forms,
  },
  {
    name: 'Loaders',
    path: '/demo/elements/loaders',
    component: Loaders,
  },
  {
    name: 'Avatars',
    path: '/demo/elements/avatars',
    component: Avatars,
  },
  {
    name: 'Blank',
    path: '/demo/pages/blank',
    component: BlankPage,
  },
  {
    name: 'Sub Navigation',
    path: '/demo/pages/subnav',
    component: SubNav,
  },
  {
    name: '404',
    path: '/demo/pages/404',
    component: ErrorPage,
  },

  {
    name: 'Activity Feed',
    path: '/demo/apps/feed',
    component: Feed,
  },
  {
    name: 'Invoice',
    path: '/demo/apps/invoice',
    component: Invoice,
  },
  {
    name: 'CMS',
    path: '/demo/apps/cms',
    component: CmsPage,
  },
];

export default pageList;
