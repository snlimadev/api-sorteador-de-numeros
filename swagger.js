const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Sorteador de Números',
      version: '1.1.3',
      description: 'Uma API Node.js que sorteia números inteiros ' +
        'sem repetição e fornece o resultado em ordem crescente.'
    },
  },
  apis: ['./api/rotas/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;