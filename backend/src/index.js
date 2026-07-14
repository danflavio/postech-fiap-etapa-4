import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import postRouter from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 3010;

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:8081', 'http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.send('API do Tech Challenge da FIAP - Etapa 4 rodando com variáveis de ambiente');
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

export default app;
