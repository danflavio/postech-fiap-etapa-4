import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO professores (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    console.log(`Professor "${nome}" cadastrado`);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error('Erro ao criar professor:', error.message);
    res.status(500).json({ error: 'Erro ao criar professor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM professores ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar professores:', error.message);
    res.status(500).json({ error: 'Erro ao buscar professores' });
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
    console.log(`Professor ID ${id} atualizado → "${nome}"`);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao atualizar professor:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar professor' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM professores WHERE id = $1 RETURNING *', [id]);
    const nome = result.rows[0]?.nome || `ID ${id}`;
    console.log(`Professor "${nome}" excluído`);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar professor:', error.message);
    res.status(500).json({ error: 'Erro ao deletar professor' });
  }
});

export default router;
