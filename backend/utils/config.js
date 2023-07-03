require('dotenv').config();

const { PORT } = process.env;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const { DB_URL } = process.env;

const CORS_DATA = {
  credentials: true,
  origin: ['https://ngagarin.nomoredomains.rocks', 'http://localhost:3101'],
  maxAge: 60,
};

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
  CORS_DATA,
};
