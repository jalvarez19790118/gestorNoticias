
import SearchNotPage from '../views/pages/search/SearchNotPage';


export default  [

   {
    name: 'Buscador de Noticias',
    path: '/gestor/n/:id',
    component: SearchNotPage
  },

  {
    name: 'Buscador de Alertas',
    path: '/gestor/a/:id',
    component: SearchNotPage
  }
  
];



