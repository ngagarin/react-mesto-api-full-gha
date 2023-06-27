const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(process.env.DB_URL);
// mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cors({ credentials: true, origin: ['https://ngagarin.nomoredomains.rocks', 'http://localhost:3001'], maxAge: 60 }));
app.use(helmet());

const limiter = rateLimit({
  max: 10000,
  windowMs: 15 * 60 * 1000,
  message: 'Превышено ограничение количества запросов. Пожалуйста, повторите попытку позже.',
});
app.use(limiter);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/api', router);
app.use(errorLogger);
app.use(handleError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
