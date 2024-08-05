const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const Restaurant = express();

Restaurant.use(bodyParser.json());

Restaurant.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'LutongBahay'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Route to get menu items
Restaurant.get('/menu', (req, res) => {
    db.query('SELECT * FROM menu', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Route to place an order
Restaurant.post('/order', (req, res) => {
    const { items } = req.body;

    const values = items.map(item => [item.id, item.quantity]);

    db.query('INSERT INTO orders (item_id, quantity) VALUES ?', [values], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, orderId: results.insertId });
    });
});

// Route to get order status
Restaurant.get('/order/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
Restaurant.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
