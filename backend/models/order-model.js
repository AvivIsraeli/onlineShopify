const Joi = require("joi");

class OrderModel {

    constructor(order) {
        this.id = order.id;
        this.userId = order.userId;
        this.cartId = order.cartId;
        this.finalPrice = order.finalPrice;
        this.creditCard = order.creditCard;
        this.idCard = order.idCard;
        this.city = order.city;
        this.street = order.street;
        this.DeliveryDate = order.DeliveryDate;
        this.orderExecutionDate = order.orderExecutionDate;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        userId: Joi.number().required().integer(),
        cartId: Joi.number().required().integer(),
        finalPrice: Joi.number().required().min(1),
        creditCard: Joi.number().required().integer(),
        idCard: Joi.number().required().integer(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        DeliveryDate: Joi.date().required(),
        orderExecutionDate: Joi.date().required(),
    });

    validatePost() {
        const result = OrderModel.#postValidationSchema.validate(this, { abortEarly: false }); 
        return result.error ? result.error.message : null; // null = no errors.
    }


}

module.exports = OrderModel;

