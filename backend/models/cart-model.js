const Joi = require("joi");

class CartModel {

    constructor(cart) {
        this.id = cart.id;
        this.userId = cart.userId;
        this.date = cart.date;

    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        userId: Joi.number().required().integer(),
        date: Joi.date().required(),
    });

    validatePost() {
        const result = CartModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; // null = no errors.
    }


}

module.exports = CartModel;

