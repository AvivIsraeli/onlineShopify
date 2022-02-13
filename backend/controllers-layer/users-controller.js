const express = require("express");
const usersLogic = require("../business-logic-layer/users-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router()

// GET http://localhost:3001/api/users/:id 
router.get("/:uuid", async (request, response) => {
    try {
        const uuid = request.params.uuid;
        const oneUser = await usersLogic.getOneUserAsync(uuid);
        if (!oneUser) return response.status(404).send("User not found.");
        response.json(oneUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


module.exports = router;