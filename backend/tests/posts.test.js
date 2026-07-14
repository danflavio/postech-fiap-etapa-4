import request from 'supertest';
import app from '../src/index.js';
import pool from '../src/config/db.js';

describe('Testes de Integração - Funcionalidade de Postagens', () => {

    it('Listar todos os posts - GET /posts', async () => {
        const response = await request(app).get('/posts');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Criar um novo post - POST /posts', async () => {
        const newPost = {
            title: 'Desafio FIAP - Etapa 2',
            content: 'Criando um post para testar a API.',
            author: 'Daniel Flávio'
        };

        const response = await request(app).post('/posts').send(newPost);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(newPost.title);

    });

    it('Erro quando faltar campos obrigatórios', async () => {
        const newPost = {
            title: 'Desafio FIAP - Etapa 2'
        };

        const response = await request(app).post('/posts').send(newPost);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

});

describe('Testes de Busca e Filtros', () => {

    it('Retornar post por ID - GET /posts/:id', async () => {
        const response = await request(app).get('/posts/1');

        if (response.status === 200) {
            expect(response.body).toHaveProperty('id', 1);
        } else {
            expect(response.status).toBe(404);
        };
    });

    it('Filtro por palavra-chave - GET /posts/search?q=<keyword>', async () => {
        const termo = 'FIAP';
        const response = await request(app).get(`/posts/search?q=${termo}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Retornar erro quando termo de busca estiver ausente - GET /posts/search', async () => {
        const response = await request(app).get('/posts/search');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'O termo de busca "q" é obrigatório.');
    });

});

describe('Testes de Exclusão', () => {
  it('Deletar um post existente (DELETE /posts/:id)', async () => {
    const response = await request(app).delete('/posts/1');

    if (response.status === 200) {
      expect(response.body).toHaveProperty('message', 'Postagem removida com sucesso.');
    } else {
      expect(response.status).toBe(404);
    }
  })
});

afterAll(async () => {
  // Encerra a conexão com o banco após todos os testes
  await pool.end();
});
