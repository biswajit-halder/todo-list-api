const db = require('../utils/db');

const createTable = async() => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    try {
        await db.query(query);
        console.log('Users table created or already exists.');
    } catch (error) {
        console.error('Error creating users table:', error);
    }
}

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]);
    return rows[0]; // Return the first user found or undefined
}

const createUser = async (email, password) => {
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [result] = await db.query(query, [email, password]);
    return { id: result.insertId, email }; // Return the new user object
}

module.exports = {
    createTable,
    getUserByEmail,
    createUser
};
