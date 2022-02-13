global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const cors = require("cors"); 

const productsController = require("./controllers-layer/products-controller");
const authController = require("./controllers-layer/auth-controller");
const cartsController = require("./controllers-layer/carts-controller");
const usersController = require("./controllers-layer/users-controller");
const itemsController = require("./controllers-layer/items-controller");
const ordersController = require("./controllers-layer/orders-controller");

const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());

//Expose index Html for Heroku:
server.use(express.static(path.join(__dirname, "frontend")));

// // Create images folder if not exists: 
if (!fs.existsSync("./images")) fs.mkdirSync("./images");

// System errors - return specific message on system errors and cancel the HTML message:
server.use((err, request, response, next) => {
    response.status(err.status).send(err.message);
});

server.use("/api/products", productsController);
server.use("/api/auth", authController);
server.use("/api/carts", cartsController);
server.use("/api/users", usersController);
server.use("/api/items", itemsController);
server.use("/api/orders", ordersController);


// Redirect any non existing route to the index.html (Server side SPA behavior):
server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Listening..."));
