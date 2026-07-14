import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fiap-tech-challenge-secret-key';

export function gerarToken(professor) {
  const payload = { id: professor.id, email: professor.email, nome: professor.nome };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verificarToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.professor = decoded;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}
