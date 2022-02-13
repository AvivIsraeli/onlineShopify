const dal = require("../data-access-layer/dal");

//get all carts by userId:
async function getOrdersByUser(userId) {
    const sql = `SELECT * FROM orders WHERE userId = ${userId}`;
    const orders = await dal.executeAsync(sql);
    return orders;
}

//get only final-price from order by cartId:
async function getFinalPriceFromOrdersByOrderId(orderId) {
    const sql = `SELECT finalPrice FROM orders WHERE id = ${orderId}`;
    const orders = await dal.executeAsync(sql);
    return orders;
}


//Add single cart
async function addOrderAsync(order) {
    const sql = `INSERT INTO orders VALUES(DEFAULT, ${order.userId}, ${order.cartId}, ${order.finalPrice}, '${order.city}', '${order.street}',
                                                    '${order.DeliveryDate}', '${order.orderExecutionDate}', ${order.idCard}, ${order.creditCard} )`;
    const info = await dal.executeAsync(sql);
    order.id = info.insertId;
    return order;
}








module.exports = {
    getOrdersByUser,
    addOrderAsync,
    getFinalPriceFromOrdersByOrderId
}