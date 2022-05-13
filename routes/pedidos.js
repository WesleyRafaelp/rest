const express = require('express');
const router = express.Router();


//retorna todos os pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    });
});

//insere um pedido
router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem: 'O pedido foi criado',
        pedidoCriado: pedido
    });
});

//retorna um pedido específico
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

        res.status(200).send({
            mensagem: 'Detalhes do Pedido',
            id_pedido: id
        });
});

//deletar um pedido
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluido'
    });
});

module.exports = router;