"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const database_1 = require("./database");
const cors_1 = tslib_1.__importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
const corsOption = { origin: ["http://localhost:5173"], };
app.use((0, cors_1.default)(corsOption));
app.use(body_parser_1.default.json());
// POST: Create a new item
app.post('/api/add_item', async (req, res) => {
    try {
        const result = await (0, database_1.createItem)(req.body);
        res.status(201).send(`Item added with ID: ${result.insertId}`);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unknown error occurred');
        }
    }
});
// GET: Retrieve all items
app.get('/api/get_items', async (req, res) => {
    try {
        const items = await (0, database_1.getItems)();
        res.status(201).json(items);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unknown error occurred');
        }
    }
});
// GET: Retrieve a single item by id
app.get('/api/get_item/:id', async (req, res) => {
    try {
        const item = await (0, database_1.getItemById)(Number(req.params.id));
        if (item) {
            res.status(200).json(item);
        }
        else {
            res.status(404).send('Item not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unknown error occurred');
        }
    }
});
// PUT: Update an item by id
app.put('/api/update_item/:id', async (req, res) => {
    try {
        const result = await (0, database_1.updateItem)(Number(req.params.id), req.body);
        if (result.affectedRows > 0) {
            res.status(200).send(`Item updated successfully`);
        }
        else {
            res.status(404).send('Item not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unknown error occurred');
        }
    }
});
// DELETE: Delete an item
app.delete('/api/delete_item/:id', async (req, res) => {
    try {
        const result = await (0, database_1.deleteItem)(Number(req.params.id));
        if (result.affectedRows > 0) {
            res.status(200).send(`Item deleted successfully`);
        }
        else {
            res.status(404).send('Item not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unknown error occurred');
        }
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
