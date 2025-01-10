import express, {Express, Request, Response} from "express";
import bodyParser from 'body-parser';
import {createItem, getItems, getItemById, updateItem, deleteItem} from "./database"
import cors from "cors"

const app = express();
const port = 8000;
const corsOption = {origin: ["http://localhost:5173"],};

app.use(cors(corsOption));
app.use(bodyParser.json());

// POST: Create a new item
app.post('/api/add_item', async (req, res) => {
    try {
        const result = await createItem(req.body);
        res.status(201).send(`Item added with ID: ${result.insertId}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

// GET: Retrieve all items
app.get('/api/get_items', async (req, res) => {
    
    try {
        const items = await getItems();
        res.status(201).json(items);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

// GET: Retrieve a single item by id
app.get('/api/get_item/:id', async (req, res) => {
    try {
        const item = await getItemById(Number(req.params.id));
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

// PUT: Update an item by id
app.put('/api/update_item/:id', async (req, res) => {
    try {
        const result = await updateItem(Number(req.params.id), req.body);
        if (result.affectedRows > 0) {
            res.status(200).send(`Item updated successfully`);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

// DELETE: Delete an item
app.delete('/api/delete_item/:id', async (req, res) => {
    try {
        const result = await deleteItem(Number(req.params.id));
        if (result.affectedRows > 0) {
            res.status(200).send(`Item deleted successfully`);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

