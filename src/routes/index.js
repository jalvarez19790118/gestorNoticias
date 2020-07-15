import SearchNotPage from '../views/pages/viewer/SearchNotPage';
import NewElementPage from '../views/pages/editor/NewElementPage';
import EditElementPage from '../views/pages/editor/EditElementPage';

export default [
  {
    name: 'Visor de noticias',
    path: '/gestor/n/:id',
    component: SearchNotPage,
  },

  {
    name: 'Visor de alertas',
    path: '/gestor/a/:id',
    component: SearchNotPage,
  },

  {
    name: 'Visor de Principios Activos',
    path: '/gestor/p/:id',
    component: SearchNotPage,
  },

  {
    name: 'Editor - Nueva noticia',
    path: '/gestor/editor/nueva_noticia/:element',
    component: NewElementPage,
  },

  {
    name: 'Editor - Nueva alerta',
    path: '/gestor/editor/nueva_alerta/:element',
    component: NewElementPage,
  },

  {
    name: 'Editor - Nueva P. Activo',
    path: '/gestor/editor/nueva_pactivo/:element',
    component: NewElementPage,
  },

  {
    name: 'Editor - Editar noticia',
    path: '/gestor/editor/editar_noticia/:element/:id',
    component: EditElementPage,
  },

  {
    name: 'Editor - Editar Alerta',
    path: '/gestor/editor/editar_alerta/:element/:id',
    component: EditElementPage,
  },
];
