const express = require("express");
const cartsLogic = require("../business-logic-layer/carts-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();
const CartModel = require("../models/cart-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");

// GET http://localhost:3001/api/carts/:id 
router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const singleCart = await cartsLogic.getSingleCart(id);
        if (!singleCart) return response.status(404).send(`id ${id} not found.`);
        response.json(singleCart);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


// GET http://localhost:3001/api/carts/by-user/:id
router.get("/by-user/:id", verifyLoggedIn, async (request, response) => {
    try {
        const userId = +request.params.id;
        const cartByUser = await cartsLogic.getCartByUser(userId);
        if (!cartByUser) return response.status(404).send(`id ${id} not found.`);
        response.json(cartByUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST http://localhost:3001/api/carts
router.post("/", async (request, response) => {
    try {
        const cartToAdd = new CartModel(request.body);

        //validation:
        const errors = cartToAdd.validatePost();
        if (errors) return response.status(400).send(errors);

        const addedCart = await cartsLogic.addCartAsync(cartToAdd);
        response.status(201).json(addedCart);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;