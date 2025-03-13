const { sorteiaNumeros } = require('../servicos/sorteio');

function controladorSorteio(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  const qtdNumeros = Number(req.query.qtdNumeros);
  const numMin = Number(req.query.numMin);
  const numMax = Number(req.query.numMax);

  if (
    Number.isSafeInteger(qtdNumeros) &&
    Number.isSafeInteger(numMin) &&
    Number.isSafeInteger(numMax) &&
    (qtdNumeros > 0 && qtdNumeros <= 1000 && qtdNumeros < numMax - numMin + 1) &&
    numMin < numMax
  ) {
    const resultado = sorteiaNumeros(qtdNumeros, numMin, numMax);

    return res.status(200).json({ resultado: resultado });
  } else {
    const minSafeInteger = Number.MIN_SAFE_INTEGER;
    const maxSafeInteger = Number.MAX_SAFE_INTEGER;

    const erro = 'Não foi possível sortear. Instruções: ' +
      'a) É obrigatório informar a quantidade de números e o intervalo; ' +
      'b) Todos os valores devem ser números inteiros; ' +
      'c) A quantidade de números deve ser no máximo 1000; ' +
      'd) O tamanho do intervalo deve ser maior que a quantidade de números; ' +
      'e) O valor mínimo do intervalo deve ser menor que o valor máximo; ' +
      `f) O intervalo deve estar entre ${minSafeInteger} e ${maxSafeInteger}.`;

    return res.status(400).json({ erro: erro });
  }
}

module.exports = { controladorSorteio };