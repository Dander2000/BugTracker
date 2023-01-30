"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.connection = void 0;
const mysql = require('mysql2');
const specification = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};
const pool = mysql.createPool(specification);
exports.pool = pool;
const connection = mysql.createConnection(specification);
exports.connection = connection;
