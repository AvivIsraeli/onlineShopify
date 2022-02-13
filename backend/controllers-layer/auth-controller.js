const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const UserModel = require("../models/user-model");
const router = express.Router();

// POST http://localhost:3001/api/auth/register
router.post("/register", async (request, response) => {
    try {
        const userToAdd = new UserModel(request.body);

        //validation:
        const errors = userToAdd.validatePost();
        if (errors) return response.status(400).send(errors);
        
        const addedUser = await authLogic.registerAsync(userToAdd);
        response.status(201).json(addedUser);

    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err.messa));
    }
});


// POST http://localhost:3001/api/connection/auth/login
router.post("/login", async (request, response) => {
    try {
        const loggedInUser = await authLogic.loginAsync(request.body);
        if (!loggedInUser) return response.status(401).send("Incorrect email or password.");
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;