const dal = require("../data-access-layer/dal");
const jwtHelper = require("../helpers/jwt-helper");
const cryptoHelper = require("../helpers/crypto-helper");

async function registerAsync(user) {

    // // Hash password: 
    user.password = cryptoHelper.hash(user.password);

    const sql = `INSERT INTO users VALUES(DEFAULT, '${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}', '${user.isAdmin}')`;
    const info = await dal.executeAsync(sql);
    user.id = info.insertId;

    //  Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}

async function loginAsync(credentials) {

    // Hash password: 
    credentials.password = cryptoHelper.hash(credentials.password);

    // Get back all columns without password and without id:
    // const sql = `SELECT id, firstName, lastName, idCard, city, street, isAdmin FROM users WHERE email = '${credentials.userName}' AND password = '${credentials.password}'`;
    const sql = `SELECT id, firstName, lastName, isAdmin FROM users WHERE email = ? AND password = ?`;
    const users = await dal.executeAsync(sql, [credentials.email, credentials.password]);
    if (users.length === 0) return null;
    const user = users[0];

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}
module.exports = {
    registerAsync,
    loginAsync
}