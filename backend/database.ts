// database.ts
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

// Define interface for Item
interface Item {
    id?: number;
    name: string;
    description?: string;
    price: number;
}

// Create a MySQL pool
const pool: Pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'my_app'
});

// CRUD operations

// Create an item
export async function createItem(item: Item): Promise<any> {
    const sql = `INSERT INTO items (name, description, price, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())`;
    const { name, description, price } = item;
    const [result] = await pool.query(sql, [name, description, price]);
    return result;
}

// Get all items
export async function getItems(): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM items");
    return rows;
}

// Get an item by ID
export async function getItemById(id: number): Promise<RowDataPacket | null> {
    const sql = `SELECT * FROM items WHERE id = ?`;
    const [rows] = await pool.query<RowDataPacket[]>(sql, [id]);
    return rows[0] || null;
}

export async function updateItem(id: number, item: Item): Promise<any> {
    const sql = `UPDATE items SET name = ?, description = ?, price = ?, updatedAt = NOW() WHERE id = ?`;
    const [result] = await pool.query(sql, [item.name, item.description, item.price, id]);
    return result;
}

export async function deleteItem(id: number): Promise<any> {
    const sql = `DELETE FROM items WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result;
}

