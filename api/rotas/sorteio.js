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
 *       405:
 *         description: Método Não Permitido
 *       429:
 *         description: Muitas Solicitações
 *       500:
 *         description: Erro Interno do Servidor
 */

const express = require('express');
const { rateLimit } = require('express-rate-limit');

const { controladorSorteio } = require('../controladores/sorteio');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { erro: 'Limite de taxa atingido para solicitações.' }
});

const router = express.Router();

router.use(rateLimiter);

router.get('/', controladorSorteio);
router.all('/', controladorSorteio); // Capturar métodos não permitidos

module.exports = router;