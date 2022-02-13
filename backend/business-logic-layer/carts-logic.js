const dal = require("../data-access-layer/dal");

//get all carts by userId:
async function getCartByUser(userId) {
    const sql = `SELECT * FROM carts WHERE userId = ${userId}`;
    const cart = await dal.executeAsync(sql);
    return cart[0];
}

//get single cart by cartId:
async function getSingleCart(id) {
    const sql = `SELECT * FROM carts WHERE id = ${id}`;
    const cart = await dal.executeAsync(sql);
    return cart[0];
}

//Add single cart
async function addCartAsync(cart) {
    const sql = `INSERT INTO carts VALUES(DEFAULT, ${cart.userId}, '${cart.date}')`;
    const info = await dal.executeAsync(sql);
    cart.id = info.insertId;
    return cart;
}





module.exports = {
    getCartByUser,
    getSingleCart,
    addCartAsync
}
 