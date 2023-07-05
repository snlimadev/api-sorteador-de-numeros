const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const sorteador = require('./Funcoes');

app.get('/api', (req, res) => {
  const qtdNumeros = Number(req.query.qtdNumeros);
  const numMin = Number(req.query.numMin);
  const numMax = Number(req.query.numMax);
  let resultado = '';

  if (Number.isSafeInteger(qtdNumeros) && Number.isSafeInteger(numMin) && Number.isSafeInteger(numMax)
      && (qtdNumeros > 0 && qtdNumeros <= 1000 && qtdNumeros < numMax - numMin + 1) && numMin < numMax) {

    resultado = sorteador.sorteiaNumeros(qtdNumeros, numMin, numMax);
    res.status(200).json({ resultado: resultado });

  } else {

    res.status(400).json({
      erro: 'Não foi possível sortear. Instruções: ' +
            'a) É obrigatório informar a quantidade de números e o intervalo; ' +
            'b) Todos os valores devem ser números inteiros; ' +
            'c) A quantidade de números deve ser no máximo 1000; ' +
            'd) O tamanho do intervalo deve ser maior que a quantidade de números; ' +
            'e) O valor mínimo do intervalo deve ser menor que o valor máximo.'
    });

  }
});

app.use((req, res, next) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

/*const port = process.env.PORT || 8080;
const data = new Date();

app.listen(port, () => {
  console.log(`Servidor node iniciado na porta ${port} em ${data}.`);
});*/

module.exports = app;