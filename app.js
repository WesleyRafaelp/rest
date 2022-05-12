const express = require('express');
const app = express();
const morgan = require('morgan')

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const res = require('express/lib/response');

app.use(morgan('dev'));

app.use('/pedidos', rotaPedidos);
app.use('/produtos', rotaProdutos);

//quando não encontra a rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});

console.log('API rodando na porta 3000')

module.exports = app;