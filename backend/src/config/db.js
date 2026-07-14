import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
})

pool.on('connect', () => {
    console.log('Conectado ao banco de dados com sucesso!');
});

export default pool;
