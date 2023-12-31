const Joi = require("joi");

/**
 * Validates an array of products using Joi schema.
 * @param {Array} products - An array of products to be validated.
 * @param {Object} products.name - The name of the product.
 * @param {Object} products.description - The description of the product.
 * @param {Object} products.price - The price of the product.
 * @param {Object} products.stockQuantity - The stock quantity of the product.
 * @returns {Object} An object representing the validation result.
 * @property {Error|null} error - Validation error, or null if validation passes.
 * @property {Object} value - The validated value, or undefined if validation fails.
 */
const productsValidator = (products) => {
    const urlSchema = Joi.string()
        .uri({
            scheme: ["http", "https"],
        })
        .label("Image url");

    const schemmaProduct = Joi.object({
        description: Joi.string().max(400).label("Description"),
        imageUrl: urlSchema,
        name: Joi.string().min(1).required().label("Name"),
        price: Joi.number().required().min(0).precision(2).label("Price"),
        categoryId: Joi.number().required().label("Category id"),
    });

    const schemaProducts = Joi.array()
        .required()
        .min(1)
        .items(schemmaProduct)
        .label("Products");

    return schemaProducts.validate(products);
};

/**
 * Validates a user object using Joi schema.
 * @param {Object} user - The user object to be validated.
 * @param {string} user.username - The username of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} user.address - The address of the user.
 * @returns {Object} An object representing the validation result.
 * @property {Error|null} error - Validation error, or null if validation passes.
 * @property {Object} value - The validated value, or undefined if validation fails.
 */
const userValidator = (user) => {
    const passwordSchema = Joi.string()
        .min(8) // Minimum length of 8 characters
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .required()
        .label("Password")
        .messages({
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        });

    const schemmaUser = Joi.object({
        firstName: Joi.string().min(1).required().label("First name"),
        lastName: Joi.string().min(1).required().label("Last name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordSchema,
        address: Joi.string().label("Address"),
        checkbox: Joi.bool().label("Agreement checkbox"),
    })
        .required()
        .label("User");
    return schemmaUser.validate(user);
};

const orderValidator = (order) => {
    const orderSchema = Joi.object({
        userId: Joi.number().required().label("User Id"),
        orderDate: Joi.string()
            .isoDate()
            .required()
            .label("Order Date YYYY-MM-DD"),
        status: Joi.string().required(),
    })
        .required()
        .label("Order");

    return orderSchema.validate(order);
};

const orderItemsValidator = (orderItems) => {
    const orderItemsSchemma = Joi.object({
        orderId: Joi.number().required().label("Order Id"),
        productId: Joi.number().required().label("Product Id"),
        quantity: Joi.number().required().label("Quantity"),
        subTotal: Joi.number().required().label("Sub-total"),
    });

    const collectionOrderItems = Joi.array()
        .required()
        .min(1)
        .items(orderItemsSchemma)
        .label("Collection of Order Items");

    return collectionOrderItems.validate(orderItems);
};

module.exports = {
    productsValidator,
    userValidator,
    orderValidator,
    orderItemsValidator,
};
