export default {
  top: [

    {
      name: 'Buscador',
      open: true,
      icon: {

        lib: 'Feather',
        name: 'FiSearch',
        style: { color: '#87a8de', 'fontSize': '1.4em', verticalAlign: 'middle' }

      },
     
      children: [
        {
          name: 'Noticias',
          url: '/gestor/n/noticias',

          icon: {

            lib: 'Bs',
            name: 'BsNewspaper',
            style: { color: '#87a8de', 'fontSize': '1.4em', verticalAlign: 'middle' }
    
          }

        },

        {
          name: 'Alertas',
          url: '/gestor/a/alertas',

          icon: {

            lib: 'Bs',
            name: 'BsFillExclamationTriangleFill',
            style: { color: '#87a8de', 'fontSize': '1.4em', verticalAlign: 'middle' }
    
          }

        },

      ]
      
      

    },

    

      
    

  ],
  bottom: [

  ],
};