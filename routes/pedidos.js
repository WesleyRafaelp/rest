const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const pedidosController = require('../controllers/pedidos-controller')

router.get('/', pedidosController.getPedidos);
router.post('/', login.obrigatorio, pedidosController.postPedidos);
router.get('/:id_pedido', pedidosController.getIdPedidos);
router.delete('/', login.obrigatorio, pedidosController.deletePedidos);

module.exports = router;