export default {
  top: [

    {
      name: 'Visor',
      open: false,
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

            lib: 'Feather',
            name: 'FiFileText',
            style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }
    
          }

        },

        {
          name: 'Alertas',
          url: '/gestor/a/alertas',

          icon: {

            lib: 'Feather',
            name: 'FiAlertTriangle',
            style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }
    
          }

        },

      ]
      
      

    },
    


    {
      name: 'Añadir',
      open: false,
      icon: {

        lib: 'Feather',
        name: 'FiFilePlus',
        style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }

      },

      children: [
        {
          name: 'Nueva noticia',
          url: '/gestor/editor/nueva_noticia',

          icon: {

            lib: 'Feather',
            name: 'FiFileText',
            style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }
    
          }

        },

        {
          name: 'Nueva alerta',
          url: '/gestor/editor/nueva_alerta',

          icon: {

            lib: 'Feather',
            name: 'FiAlertTriangle',
            style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }
    
          }

        },
      
      
      ]
    },


    {
      name: 'Editar',
      open: false,
      icon: {

        lib: 'Feather',
        name: 'FiEdit',
        style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }

      },

      children: [
        {
          name: 'Editar noticia',
          url: '/gestor/editor/editar_noticia',

          icon: {

            lib: 'Feather',
            name: 'FiFileText',
            style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }
    
          }

        },

        {
          name: 'Editar alerta',
          url: '/gestor/editor/editar_alerta',

          icon: {

            lib: 'Feather',
            name: 'FiAlertTriangle',
            style: { color: '#fff', 'fontSize': '1.2em', verticalAlign: 'middle' }
    
          }

        },
      
      
      ]
    }

      
    

  ],
  bottom: [

  ],
};