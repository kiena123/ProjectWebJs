import mysql from 'mysql2';
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.HOST_DATABASE,
    database: process.env.NAME_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

export default promisePool;