const Joi = require("joi");

class ProductModel {

    constructor(product) {
        this.id = product.id;
        this.productName = product.productName;
        this.price = product.price;
        this.categoryId = product.categoryId;
        this.image = product.image;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        productName: Joi.string().optional().min(2).max(20),
        price: Joi.number().required().min(1).max(10000),
        categoryId: Joi.number().required(),
        image: Joi.string().optional()
    });

    // Create put validation schema only once as a private (#) static object:
    static #putValidationSchema = Joi.object({
        id: Joi.forbidden(),
        productName: Joi.string().required().min(2).max(20),
        price: Joi.number().required().min(1).max(10000),
        categoryId: Joi.number().required(),
        image: Joi.string().optional()
    });

    validatePost() {
        const result = ProductModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePut() {
        const result = ProductModel.#putValidationSchema.validate(this, { abortEarly: false });
    }

}

module.exports = ProductModel;
