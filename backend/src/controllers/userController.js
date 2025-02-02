// backend/src/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

// chave secreta para assinar o JWT (em produção, use variável de ambiente)
const JWT_SECRET = 'MINHA_CHAVE_SECRETA';

exports.registerUser = (req, res) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email e password são obrigatórios.' });
  }

  userService.registerUser({ name, email, password, avatar })
    .then((user) => res.json({ data: user }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getUser = (req, res) => {
  const userId = req.params.id;
  userService.getUserById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      res.json({ data: user });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email e password são obrigatórios.' });
  }

  // 1) Busca usuário pelo email
  userService.findByEmail(email)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
      // 2) Compara a senha com o hash salvo
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao validar senha.' });
        }
        if (!match) {
          return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        // 3) Gera token
        const token = jwt.sign(
          { 
            id: user.id,
            email: user.email,
            name: user.name
          },
          JWT_SECRET,
          { expiresIn: '1h' } // expira em 1 hora
        );
        // Remove a senha do objeto
        delete user.password;
        // 4) Retorna user + token
        return res.json({
          data: {
            user,
            token
          }
        });
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.updateUser = (req, res) => {
  const userId = req.params.id; // ID vindo da rota /:id
  const { name, avatar } = req.body;

  // Exemplo simples: atualizar somente name e avatar
  userService.updateUser(userId, { name, avatar })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      res.json({ data: updatedUser });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};