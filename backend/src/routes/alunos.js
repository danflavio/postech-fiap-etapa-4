import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO alunos (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    console.log(`Aluno "${nome}" cadastrado`);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error('Erro ao criar aluno:', error.message);
    res.status(500).json({ error: 'Erro ao criar aluno' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alunos ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM alunos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar aluno:', error.message);
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE alunos SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
      [nome, email, id]
    );
    console.log(`Aluno ID ${id} atualizado → "${nome}"`);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM alunos WHERE id = $1 RETURNING *', [id]);
    const nome = result.rows[0]?.nome || `ID ${id}`;
    console.log(`Aluno "${nome}" excluído`);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar aluno:', error.message);
    res.status(500).json({ error: 'Erro ao deletar aluno' });
  }
});

export default router;
