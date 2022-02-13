const dal = require("../data-access-layer/dal");
const path = require("path");
const filesHelper = require("../helpers/files-helper");
const uuid = require("uuid");

async function getAllCategoriesAsync() {
    const sql = "SELECT * FROM Categories";
    const categories = await dal.executeAsync(sql);
    return categories;
}

//Add single cart
async function addCategoryAsync(category) {
    const sql = `INSERT INTO categories VALUES(DEFAULT, '${category.categoryName}')`;
    const info = await dal.executeAsync(sql);
    category.id = info.insertId;
    return category;
}

async function getAllProductsByCategoryAsync(categoryId) {
    const sql = `SELECT products.*, concat(products.id, '.jpg') AS imageName FROM products WHERE categoryId = ${categoryId}`;
    const products = await dal.executeAsync(sql);
    return products;
}

async function getAllProductsAsync() {
    const sql = `SELECT products.*, concat(products.id, '.jpg') AS imageName, categoryName 
    FROM products JOIN categories 
    ON products.categoryId = categories.id`;
    const products = await dal.executeAsync(sql);
    return products;
}

async function getOneProductAsync(id) {
    const sql = `SELECT *, concat(id, '.jpg') AS imageName
    FROM products WHERE id = ${id} `;
    const oneProduct = await dal.executeAsync(sql);
    return oneProduct[0];
}

async function addProductAsync(product, image) {
    const sql = `INSERT INTO products VALUES(DEFAULT, '${product.productName}', ${product.price}, ${product.categoryId}, '${product.imageName}')`;
    const info = await dal.executeAsync(sql);
    product.id = info.insertId;

    //save the image in Hard-Disk:
    const extension = image.name.substr(image.name.lastIndexOf("."));
    const fileName = product.id + extension;
    product.imageName = fileName;
    const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
    await image.mv(absolutePath);
    return product;
}

async function updateProductAsync(product, image) {
    const sql = `UPDATE products SET 
                productName = '${product.productName}',
                price = ${product.price},
                categoryId ='${product.categoryId}',
                imageName = '${product.imageName}'
                WHERE id = ${product.id}`;
    const info = await dal.executeAsync(sql);

    //if image exist into object the user sent, so we save the image in Hard-Disk: 
    if (image) {
        //save the image in Hard-Disk:
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = product.id + extension;
        product.imageName = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        await image.mv(absolutePath);
    }
    return info.affectedRows === 0 ? null : product;
}

async function deleteProductAsync(id) {
    const sql = `DELETE FROM products WHERE id = ${id}`;
    await dal.executeAsync(sql);
    const fileName = id + ".jpg";
    const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
    filesHelper.safeDelete(absolutePath);
}

async function searchProductsAsync(textToSearch) {
    const sql = `SELECT products.*, 
    concat(products.id, '.jpg') AS imageName, categoryName 
    FROM products JOIN categories 
    ON products.categoryId = categories.id
    WHERE productName LIKE '%${textToSearch}%'`;
    const result = await dal.executeAsync(sql);
    return result;
}

module.exports = {
    getAllCategoriesAsync,
    getAllProductsByCategoryAsync,
    getAllProductsAsync,
    getOneProductAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync,
    searchProductsAsync,
    addCategoryAsync
}