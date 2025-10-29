const { verify } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const data = verify(token);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authMiddleware;
