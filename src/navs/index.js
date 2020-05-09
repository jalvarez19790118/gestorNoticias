export default {
  top: [

    {
      name: 'Buscador',
      open: true,
      icon: {

        lib: 'Feather',
        name: 'FiSearch',
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

    

      
    

  ],
  bottom: [

  ],
};