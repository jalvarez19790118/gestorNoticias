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
          url: '/gestor/buscador/noticias',

          icon: {

            lib: 'Bs',
            name: 'BsNewspaper',
            style: { color: '#87a8de', 'fontSize': '1.4em', verticalAlign: 'middle' }
    
          }

        },
      ]
      
      

    },

    

      
    

  ],
  bottom: [

  ],
};