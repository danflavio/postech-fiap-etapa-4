import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();

const SELECT_SEM_SENHA = 'SELECT id, nome, email FROM professores';

router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios' });
  }
  try {
    const hash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      'INSERT INTO professores (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, hash]
    );
    console.log(`Professor "${nome}" cadastrado`);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error('Erro ao criar professor:', error.message);
    res.status(500).json({ erro: 'Erro ao criar professor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`${SELECT_SEM_SENHA} ORDER BY id`);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar professores:', error.message);
    res.status(500).json({ erro: 'Erro ao buscar professores' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`${SELECT_SEM_SENHA} WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Professor não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar professor:', error.message);
    res.status(500).json({ erro: 'Erro ao buscar professor' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    let query, values;
    if (senha) {
      const hash = await bcrypt.hash(senha, 10);
      query = 'UPDATE professores SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING id, nome, email';
      values = [nome, email, hash, id];
    } else {
      query = 'UPDATE professores SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email';
      values = [nome, email, id];
    }
    const result = await pool.query(query, values);
    console.log(`Professor ID ${id} atualizado → "${nome}"`);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao atualizar professor:', error.message);
    res.status(500).json({ erro: 'Erro ao atualizar professor' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM professores WHERE id = $1 RETURNING id, nome', [id]);
    const nome = result.rows[0]?.nome || `ID ${id}`;
    console.log(`Professor "${nome}" excluído`);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar professor:', error.message);
    res.status(500).json({ erro: 'Erro ao deletar professor' });
  }
});

export default router;
