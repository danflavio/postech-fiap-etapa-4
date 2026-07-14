import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM professores');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar professores' });
  }
});

router.post('/', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO professores (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar professor' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE professores SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
      [nome, email, id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar professor' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM professores WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar professor' });
  }
});

export default router;
