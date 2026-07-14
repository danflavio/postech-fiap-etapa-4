import pg from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    max: 5,
})

async function ensureTables() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                author VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await client.query(`
            CREATE TABLE IF NOT EXISTS professores (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                senha VARCHAR(255) DEFAULT ''
            );
        `);
        await client.query(`
            ALTER TABLE professores ADD COLUMN IF NOT EXISTS senha VARCHAR(255) DEFAULT '';
        `);
        await client.query(`
            CREATE TABLE IF NOT EXISTS alunos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL
            );
        `);

        const { rows } = await client.query('SELECT COUNT(*) as total FROM professores');
        if (parseInt(rows[0].total) === 0) {
            const hash = await bcrypt.hash('admin123', 10);
            await client.query(
                'INSERT INTO professores (nome, email, senha) VALUES ($1, $2, $3)',
                ['Administrador', 'admin@fiap.com.br', hash]
            );
            console.log('Seed: admin@fiap.com.br / admin123');
        }
    } finally {
        client.release();
    }
    console.log('Banco de dados inicializado — tabelas verificadas');
}

const tablesReady = ensureTables();

export { tablesReady };
export default pool;
