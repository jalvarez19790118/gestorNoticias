export default {
  top: [

    {
      name: 'Visor',
      open: true,
      icon: {

        lib: 'Feather',
        name: 'FiEye',
        style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }

      },
     
      children: [
        {
          name: 'Noticias',
          url: '/gestor/n/noticias',

          icon: {

            lib: 'Bs',
            name: 'BsNewspaper',
            style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }
    
          }

        },

        {
          name: 'Alertas',
          url: '/gestor/a/alertas',

          icon: {

            lib: 'Bs',
            name: 'BsFillExclamationTriangleFill',
            style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }
    
          }

        },

      ]
      
      

    },
    
    {
      name: 'Editor de noticias',
      url: '/gestor/editor',
      icon: {

        lib: 'Feather',
        name: 'FiEdit',
        style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }

      }
    }

      
    

  ],
  bottom: [

  ],
};