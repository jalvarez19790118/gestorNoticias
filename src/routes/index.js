
import SearchNotPage from '../views/pages/search/SearchNotPage';
import SearchAlertPage from '../views/pages/search/SearchAlertPage';


export default  [
    
    {
      name: 'Buscador de Noticias',
      path: '/gestor/buscador/noticias',
      component: SearchNotPage
    },
   {
    
    name: 'Buscador de Alertas',
    path: '/gestor/buscador/alertas',
    component: SearchAlertPage
  },
  
];



