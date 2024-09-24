const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

const rotaSorteio = require('./rotas/sorteio');

const app = express();

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css'
}));

app.use('/api', rotaSorteio); // Manter compatibilidade com versões anteriores
app.use('/sorteio', rotaSorteio);

app.use((req, res, next) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

/*
app.listen(8080, () => {
  console.log('Servidor node em execução.');
});
*/

module.exports = app;