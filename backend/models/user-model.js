const Joi = require("joi");

class UserModel {

    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean().optional(),
    });
    
    validatePost() {
        const result = UserModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; 
    }

}

module.exports = UserModel;
