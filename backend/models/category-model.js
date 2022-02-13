const Joi = require("joi");

class CategoryModel {

    constructor(category) {
        this.id = category.id;
        this.categoryName = category.categoryName;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        categoryName: Joi.string().required().min(2).max(50)
    });

    validatePost() {
        const result = CategoryModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; // null = no errors.
    }
}

module.exports = CategoryModel;

