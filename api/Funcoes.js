//#region Função local que gera um número aleatório
function sortear(min, max) {
  return (
    Math.floor(Math.random() * (max - min + 1) + min)
  );
}
//#endregion

//#region Função para retornar, em ordem crescente e sem duplicatas, números aleatórios com base nos parâmetros
function sorteiaNumeros(qtdNumeros, numMin, numMax) {
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

  return resultado;
}
//#endregion

exports.sorteiaNumeros = sorteiaNumeros;