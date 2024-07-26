import dotenv from 'dotenv';
dotenv.config();
// require('dotenv').config();
import mysql from 'mysql2';

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
}).promise();

export const redisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
}

export default pool;