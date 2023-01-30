const mysql = require('mysql2');

interface PoolSpecific{
    host: String | undefined;
    user: String | undefined;
    password: String | undefined;
    database: String | undefined;

}

const specification:PoolSpecific = {
    host: process.env.HOST,
    user: process.env.USER, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const pool = mysql.createPool(specification);
const connection = mysql.createConnection(specification);

export { connection, pool }
