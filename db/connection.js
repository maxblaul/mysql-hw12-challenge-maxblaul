
const express = require('express');
// Import and require express and mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database employee tracker
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee database.`)
);

module.exports = db;