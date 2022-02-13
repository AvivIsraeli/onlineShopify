const mysql = require("mysql");

//Create Connection to Data-Base BY createPool():
const connection = mysql.createPool({

    // machine-computer:
    host: config.mysql.host,

    // username:
    user: config.mysql.user,

    // password:
    password: config.mysql.password,


    //data-base name:
    database: config.mysql.name

});

function executeAsync(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) =>{
            if(err) return reject(err);
            resolve(result);
        });

    });
}

module.exports = {
    executeAsync
};
