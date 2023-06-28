const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { PORT, DB_URL } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const limiter = rateLimit({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'Превышено ограничение количества запросов. Пожалуйста, повторите попытку позже.',
});

app.use(cors({ credentials: true, origin: ['https://ngagarin.nomoredomains.rocks', 'http://localhost:3001'], maxAge: 60 }));
app.use(helmet());
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
