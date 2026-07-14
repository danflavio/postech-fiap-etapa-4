import pool from "../config/db.js";

const postsController = {

  getAllPosts: async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM posts ORDER BY created_at DESC",
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  },

  createPost: async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: "Título, conteúdo e autor são obrigatórios." });
    }

    try {
      const query =
        "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *";
      const values = [title, content, author];

      const result = await pool.query(query, values);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao criar post:", error);
      res.status(500).json({ message: "Erro ao salvar a postagem." });
    }
  },

  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
        id,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Postagem não encontrada." });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar post por ID:", error);
      res.status(500).json({ message: "Erro ao processar sua busca." });
    }
  },

  updatePost: async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    try {
      const query = `
        UPDATE posts
        SET title = $1, content = $2, author = $3
        WHERE id = $4
        RETURNING *`;

      const result = await pool.query(query, [title, content, author, id]);

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Postagem não encontrada para atualização." });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      res.status(500).json({ message: "Erro ao salvar alterações." });
    }
  },

  searchPosts: async (req, res) => {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'O termo de busca "q" é obrigatório.' });
    }

    try {
      const query = 'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 ORDER BY created_at DESC';
      const values = [`%${q}%`];

      const result = await pool.query(query, values);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Erro na busca de posts:', error);
      res.status(500).json({ message: 'Erro ao processar a pesquisa.' });
    }
  },

  deletePost: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Postagem não encontrada para exclusão.' });
      }

      res.status(200).json({ message: 'Postagem removida com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      res.status(500).json({ message: 'Erro ao processar a exclusão.' });
    }
  }

};

export default postsController;
