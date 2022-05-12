const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use('/pedidos', rotaPedidos);
app.use('/produtos', rotaProdutos);
app.use('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: 'OK, deu certo!'
    });
});

console.log('API rodando na porta 3000')

module.exports = app;