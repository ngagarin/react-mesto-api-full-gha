const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { DB_ADRESS } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DB_ADRESS);
// mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Превышено ограничение количества запросов. Пожалуйста, повторите попытку позже.',
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(handleError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
