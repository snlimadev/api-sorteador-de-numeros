//#region Função local que gera um número aleatório
function sortear(min, max) {
  return (
    Math.floor(Math.random() * (max - min + 1) + min)
  );
}
//#endregion

//#region Função para retornar, em ordem crescente e sem duplicatas, números aleatórios com base nos parâmetros
function sorteiaNumeros(qtdNumeros, numMin, numMax) {
  if (
    Number.isSafeInteger(qtdNumeros) && Number.isSafeInteger(numMin) && Number.isSafeInteger(numMax)
    && (qtdNumeros > 0 && qtdNumeros <= 1000 && qtdNumeros < numMax - numMin + 1) && numMin < numMax
  ) {
    const numeros = [];
    const numerosUnicos = [];
    let valorDuplicado = false;
    let resultado = '';

    for (let i = 0; i < qtdNumeros; i++) {
      numeros.push(sortear(numMin, numMax));
    }

    for (let x = 0; x < numeros.length; x++) {
      for (let y = 0; y < numerosUnicos.length; y++) {
        if (numeros[x] === numerosUnicos[y]) {
          valorDuplicado = true;
        }
      }

      if (!valorDuplicado) {
        numerosUnicos.push(numeros[x]);
      } else {
        numeros.push(sortear(numMin, numMax));
      }

      valorDuplicado = false;
    }

    resultado = String(numerosUnicos.sort((a, b) => a - b).join(', '));

    return { status: 200, json: { resultado: resultado } };
  } else {
    return {
      status: 400,
      json: {
        erro: 'Não foi possível sortear. Instruções: ' +
          'a) É obrigatório informar a quantidade de números e o intervalo; ' +
          'b) Todos os valores devem ser números inteiros; ' +
          'c) A quantidade de números deve ser no máximo 1000; ' +
          'd) O tamanho do intervalo deve ser maior que a quantidade de números; ' +
          'e) O valor mínimo do intervalo deve ser menor que o valor máximo.'
      }
    };
  }
}
//#endregion

module.exports = { sorteiaNumeros };