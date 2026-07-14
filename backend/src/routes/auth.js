import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { gerarToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
  }

  try {
    const result = await pool.query('SELECT * FROM professores WHERE email = $1', [email]);
    const professor = result.rows[0];

    if (!professor) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const valida = await bcrypt.compare(senha, professor.senha || '');
    if (!valida) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }

    const token = gerarToken(professor);
    console.log(`Professor "${professor.nome}" autenticado`);

    res.json({
      token,
      professor: { id: professor.id, nome: professor.nome, email: professor.email },
    });
  } catch (error) {
    console.error('Erro no login:', error.message);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

export default router;
