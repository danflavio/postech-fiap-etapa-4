import express from 'express';
import pool from '../config/db.js'; // Verifique se o seu db também exporta corretamente

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alunos');
    res.json(result.rows);
  } catch (error) { 
    res.status(500).json({ error: 'Erro ao buscar alunos' }); 
  }
});

router.post('/', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO alunos (nome, email) VALUES ($1, $2) RETURNING *', [nome, email]
    );
    res.status(201).json(result.rows);
  } catch (error) { 
    res.status(500).json({ error: 'Erro ao criar aluno' }); 
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE alunos SET nome = $1, email = $2 WHERE id = $3 RETURNING *', [nome, email, id]
    );
    res.json(result.rows);
  } catch (error) { 
    res.status(500).json({ error: 'Erro ao atualizar aluno' }); 
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM alunos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) { 
    res.status(500).json({ error: 'Erro ao deletar aluno' }); 
  }
});

export default router;