const Joi = require("joi");

class ItemModel {

    constructor(item) {
        this.id = item.id;
        this.cartId = item.cartId;
        this.productId = item.productId;
        this.amount = item.amount;
        this.generalPrice = item.generalPrice;
    }

    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        cartId: Joi.number().integer(),
        productId: Joi.number().integer(),
        amount: Joi.number().integer().min(1),
        generalPrice: Joi.number().min(1),

        
    });

    validatePost() {
        const result = ItemModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }


}

module.exports = ItemModel;

