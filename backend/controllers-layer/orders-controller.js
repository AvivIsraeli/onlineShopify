const express = require("express");
const ordersLogic = require("../business-logic-layer/orders-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router()
const OrderModel = require("../models/order-model");

// GET http://localhost:3001/api/orders/by-user/:id
router.get("/by-user/:id", async (request, response) => {
    try {
        const userId = +request.params.id;
        const ordersByUser = await ordersLogic.getOrdersByUser(userId);
        if (!ordersByUser) return response.status(404).send(`id ${id} not found.`);
        response.json(ordersByUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET http://localhost:3001/api/orders/finalPrice/by-order/:id
router.get("/finalPrice/by-order/:id", async (request, response) => {
    try {
        const cartId = +request.params.id;
        const finalPrice = await ordersLogic.getFinalPriceFromOrdersByOrderId(cartId);
        if (!finalPrice) return response.status(404).send(`id ${id} not found.`);
        response.json(finalPrice);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

//add new order- POST http://localhost:3001/api/order
router.post("/", async (request, response) => {
    try {
        const orderToAdd = new OrderModel(request.body);

        //validation:
        const errors = orderToAdd.validatePost();
        if (errors) return response.status(400).send(errors);

        const addedOrder = await ordersLogic.addOrderAsync(orderToAdd);
        response.status(201).json(addedOrder);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;