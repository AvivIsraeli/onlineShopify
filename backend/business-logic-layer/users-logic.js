const dal = require("../data-access-layer/dal");

async function getOneUserAsync(id) {
    const sql = `SELECT firstName, lastName, isAdmin
    FROM users WHERE id = ${id} `;
    const users = await dal.executeAsync(sql);
    return users[0];
}


module.exports = {
    getOneUserAsync
}