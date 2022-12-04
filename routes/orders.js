const express = require('express');
const { addOrder, getOrders } = require('../controllers/ordersControllers');
const { verifyToken } = require('../helpers/token');

const router = express.Router();

router
    .post('/', addOrder)
    .get('/', verifyToken, getOrders)
    
module.exports = router