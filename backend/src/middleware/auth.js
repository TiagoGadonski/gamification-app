// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'MINHA_CHAVE_SECRETA';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']; // "Bearer <token>"
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
    // Se OK, guardamos as infos do token em req.user
    req.user = decoded;
    next();
  });
};
