const dal = require("../data-access-layer/dal");

//get items by cart:
async function getItemsByCart(cartId) {
    const sql = `SELECT * FROM items JOIN products ON items.productId = products.id WHERE cartId = ${cartId}`;
    const items = await dal.executeAsync(sql);
    return items;
}

async function getTotalItemsByCart(cartId) {
    const sql = `SELECT * FROM items JOIN products ON items.productId = products.id WHERE cartId = ${cartId}`;
    const items = await dal.executeAsync(sql);
    return items.length;
}


//add item into cart:
async function addItemIntoCartAsync(item) {
    const sql = `INSERT INTO items VALUES(DEFAULT, ${item.cartId}, ${item.productId}, ${item.amount}, ${item.generalPrice})`;
    
    const info = await dal.executeAsync(sql);
    item.id = info.insertId;
    return item;
}

//delete single item from cart:
async function deleteItemFromCartAsync(productId, cartId) {
    const sql = `DELETE FROM items WHERE productId = ${productId} AND cartId = ${cartId} `;
    await dal.executeAsync(sql);
}

//delete all items from cart:
async function EmptyCartAsync(cartId) {
    const sql = `DELETE FROM items WHERE cartId = ${cartId}`;
    await dal.executeAsync(sql);
}

module.exports = {
    getItemsByCart,
    addItemIntoCartAsync,
    deleteItemFromCartAsync,
    EmptyCartAsync,
    getTotalItemsByCart
}