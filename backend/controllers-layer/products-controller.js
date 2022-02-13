const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn =  require("../middleware/verify-logged-in");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");
const path = require("path");
const fs = require("fs");
const router = express.Router();


// GET http://localhost:3001/api/products/categories
router.get("/categories", async (request, response) => {
    try {
        const categories = await productsLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST http://localhost:3001/api/products/categories
router.post("/categories", async (request, response) => {
    try {
        const categoryToAdd = new CategoryModel(request.body);

        //validation:
        const errors = categoryToAdd.validatePost();
        if (errors) return response.status(400).send(errors);

        const addedCart = await productsLogic.addCategoryAsync(categoryToAdd);
        response.status(201).json(addedCart);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET http://localhost:3001/api/products/by-category/:id
router.get("/by-category/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const allProductsByCategory = await productsLogic.getAllProductsByCategoryAsync(id);
        if (!allProductsByCategory) return response.status(404).send(`id ${id} not found.`);
        response.json(allProductsByCategory);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET http://localhost:3001/api/products 
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// GET http://localhost:3001/api/products/:id 
router.get("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const id = +request.params.id;
        const oneProduct = await productsLogic.getOneProductAsync(id);
        if (!oneProduct) return response.status(404).send(`id ${id} not found.`);
        response.json(oneProduct);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


//POST http://localhost:3001/api/products
router.post("/", async (request, response) => {
    try {
        const productToAdd = new ProductModel(request.body);

        if (!request.body.categoryId) return response.status(400).send('Missing Category _Id');
        
        if (!productToAdd.categoryId) {
            return response.status(404).send(`category _Id not found.`)
        }
        
        //validation:
        const errors = productToAdd.validatePost();
        if (errors) return response.status(400).send(errors);

        // If user didn't sent any file to this route:
        if (!request.files) return response.status(400).send("No image sent!");

        //Extract image-File from request.files:
        const image = request.files && request.files.image ? request.files.image : null;

        if (!image) return response.status(400).send("Missing an image!");

        const addedProduct = await productsLogic.addProductAsync(productToAdd, image);
        response.status(201).json(addedProduct);

    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// PUT http://localhost:3001/api/products/:id 
router.put("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const productToUpdate = new ProductModel(request.body);
        productToUpdate.id = id;

        //validation:
        const errors = productToUpdate.validatePut();
        if (errors) return response.status(400).send(errors);

        //Extract image-File from request.files:
        const image = request.files && request.files.image ? request.files.image : null;

        const updatedProduct = await productsLogic.updateProductAsync(productToUpdate, image);
        if (!updatedProduct) return response.status(404).send(`id ${id} not found.`);
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// DELETE http://localhost:3001/api/products/:id
router.delete("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        await productsLogic.deleteProductAsync(id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

//SEARCH-Product http://localhost:3001/api/products/search/:textToSearch 
router.get("/search/:textToSearch", async (request, response) => {
    try {
        const textToSearch = request.params.textToSearch.toLocaleLowerCase();
        const results = await productsLogic.searchProductsAsync(textToSearch);
        if (!results) return response.status(404).send(`TEXT: '${textToSearch}' is Not Found!`);
        response.json(results);
    }
    catch (err) {
        response.status(500).send(err.message);
    }

})


// GET http://localhost:3001/api/products/images/7.jpg 
router.get("/images/:name", (request, response) => {
    try {
        const name = request.params.name;

        let absolutePath = path.join(__dirname, "..", "images", "products", name);
        if (!fs.existsSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..", "images", "image not found.jpg");
        }
        response.sendFile(absolutePath);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});



module.exports = router;