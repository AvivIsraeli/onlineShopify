const express = require("express");
const itemsLogic = require("../business-logic-layer/items-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router()
const ItemModel = require("../models/item-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");


// GET items by cartID http://localhost:3001/api/items/by-cart/:id
router.get("/by-cart/:id", verifyLoggedIn, async (request, response) => {
    try {
        const cartId = +request.params.id;
        const itemsByCart = await itemsLogic.getItemsByCart(cartId);
        if (!itemsByCart) return response.status(404).send(`id ${id} not found.`);
        response.json(itemsByCart);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET items by cartID http://localhost:3001/api/items/total-items/:id
router.get("/total-items/:id", async (request, response) => {
    try {
        const cartId = +request.params.id;
        const itemsByCart = await itemsLogic.getTotalItemsByCart(cartId);
        if (!itemsByCart) return response.status(404).send(`id ${id} not found.`);
        response.json(itemsByCart);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST add item into cart http://localhost:3001/api/items
router.post("/", verifyLoggedIn, async (request, response) => {
    try {
        const itemToAdd = new ItemModel(request.body);
        
        // //validation:
        // const errors = itemToAdd.validatePost();
        // if (errors) return response.status(400).send(errors);


        const addedItem = await itemsLogic.addItemIntoCartAsync(itemToAdd);
        response.status(201).json(addedItem);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// DELETE specific item from cart- http://localhost:3001/api/items/:productId/:cartId
router.delete("/:productId/:cartId", async (request, response) => {
    try {
        const productId = +request.params.productId;
        const cartId = +request.params.cartId;
        await itemsLogic.deleteItemFromCartAsync(productId, cartId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// DELETE all items of cart- http://localhost:3001/api/items/:id
router.delete("/:cartId", async (request, response) => {
    try {
        const cartId = +request.params.cartId;
        await itemsLogic.EmptyCartAsync(cartId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;