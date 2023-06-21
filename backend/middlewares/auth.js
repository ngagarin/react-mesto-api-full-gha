require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

module.exports = {
  validateToken,
};
