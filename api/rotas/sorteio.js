/**
 * @swagger
 * /sorteio:
 *   get:
 *     summary: Sorteia números com base nos parâmetros fornecidos
 *     description: >
 *       Este endpoint é utilizado para sortear números inteiros sem repetição
 *       e retornar o resultado em ordem crescente.
 *       A resposta no formato JSON contém a propriedade 'resultado' ou 'erro',
 *       cujos valores são strings.
 *     tags:
 *       - Sorteio
 *     parameters:
 *       - in: query
 *         name: qtdNumeros
 *         description: Quantidade de números a sortear
 *         required: true
 *         schema:
 *           type: integer
 *         example: 10
 * 
 *       - in: query
 *         name: numMin
 *         description: Número mínimo do intervalo
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 * 
 *       - in: query
 *         name: numMax
 *         description: Número máximo do intervalo
 *         required: true
 *         schema:
 *           type: integer
 *         example: 100
 *     responses:
 *       200:
 *         description: Sucesso
 *       400:
 *         description: Solicitação Inválida
 *       500:
 *         description: Erro Interno do Servidor
 */

const express = require('express');
const router = express.Router();

const { controladorSorteio } = require('../controladores/sorteio');

router.get('/', controladorSorteio);

module.exports = router;