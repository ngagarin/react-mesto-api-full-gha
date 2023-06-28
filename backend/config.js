require('dotenv').config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const DB_URL = process.env.DB_URL;

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
};
