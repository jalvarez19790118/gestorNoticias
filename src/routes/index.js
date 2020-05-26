
import SearchNotPage from '../views/pages/viewer/SearchNotPage';
import NewNotPage from '../views/pages/editor/NewNotPage';
import NewAlertPage from '../views/pages/editor/NewAlertPage';


export default  [

   {
    name: 'Visor de Noticias',
    path: '/gestor/n/:id',
    component: SearchNotPage
  },

  {
    name: 'Visor de Alertas',
    path: '/gestor/a/:id',
    component: SearchNotPage
  },
  
  {
    name: 'Editor - Nueva Noticia',
    path: '/gestor/editor/nueva_noticia',
    component: NewNotPage
  },

  {
    name: 'Editor - Nueva Alerta',
    path: '/gestor/editor/nueva_alerta',
    component: NewAlertPage
  }

];



