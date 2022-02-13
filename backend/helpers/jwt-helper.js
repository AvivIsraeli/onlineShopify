const jwt = require("jsonwebtoken"); // npm i jsonwebtoken

function getNewToken(user) {
    return jwt.sign({ payload: user }, config.jwtKey, { expiresIn: "1d" });
    
}

module.exports = {
    getNewToken
};