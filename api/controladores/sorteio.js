const { sorteiaNumeros } = require('../servicos/sorteio');

function controladorSorteio(req, res) {
  const qtdNumeros = Number(req.query.qtdNumeros);
  const numMin = Number(req.query.numMin);
  const numMax = Number(req.query.numMax);
  let status, json;

  if (
    Number.isSafeInteger(qtdNumeros) &&
    Number.isSafeInteger(numMin) &&
    Number.isSafeInteger(numMax) &&
    (qtdNumeros > 0 && qtdNumeros <= 1000 && qtdNumeros < numMax - numMin + 1) &&
    numMin < numMax
  ) {
    const resultado = sorteiaNumeros(qtdNumeros, numMin, numMax);

    status = 200;
    json = { resultado: resultado };
  } else {
    const minSafeInteger = Number.MIN_SAFE_INTEGER;
    const maxSafeInteger = Number.MAX_SAFE_INTEGER;

    status = 400;
    json = {
      erro: 'Não foi possível sortear. Instruções: ' +
        'a) É obrigatório informar a quantidade de números e o intervalo; ' +
        'b) Todos os valores devem ser números inteiros; ' +
        'c) A quantidade de números deve ser no máximo 1000; ' +
        'd) O tamanho do intervalo deve ser maior que a quantidade de números; ' +
        'e) O valor mínimo do intervalo deve ser menor que o valor máximo; ' +
        `f) O intervalo deve estar entre ${minSafeInteger} e ${maxSafeInteger}.`
    };
  }

  res.status(status).json(json);
}

module.exports = { controladorSorteio };