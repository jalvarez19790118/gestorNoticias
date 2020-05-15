
import SearchNotPage from '../views/pages/viewer/SearchNotPage';
import EditNotPage from '../views/pages/editor/EditorNotPage';


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
    name: 'Editor de noticias',
    path: '/gestor/editor/',
    component: EditNotPage
  }
];



