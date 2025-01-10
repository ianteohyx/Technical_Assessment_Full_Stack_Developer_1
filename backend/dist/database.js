"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = createItem;
exports.getItems = getItems;
exports.getItemById = getItemById;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
// database.ts
const promise_1 = require("mysql2/promise");
// Create a MySQL pool
const pool = (0, promise_1.createPool)({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'my_app'
});
// CRUD operations
// Create an item
async function createItem(item) {
    const sql = `INSERT INTO items (name, description, price, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())`;
    const { name, description, price } = item;
    const [result] = await pool.query(sql, [name, description, price]);
    return result;
}
// Get all items
async function getItems() {
    const [rows] = await pool.query("SELECT * FROM items");
    return rows;
}
// Get an item by ID
async function getItemById(id) {
    const sql = `SELECT * FROM items WHERE id = ?`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0] || null;
}
async function updateItem(id, item) {
    const sql = `UPDATE items SET name = ?, description = ?, price = ?, updatedAt = NOW() WHERE id = ?`;
    const [result] = await pool.query(sql, [item.name, item.description, item.price, id]);
    return result;
}
async function deleteItem(id) {
    const sql = `DELETE FROM items WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
}
