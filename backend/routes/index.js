const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const userController = require('../controllers/users');
const { validateToken } = require('../middlewares/auth');
const { URL_PATTERN, allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');
const { NotFoundError } = require('../utils/errors/index');

// обработка простых CORS запросов и префлайт запросовp
router.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      const requestHeaders = req.headers['access-control-request-headers'];
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }

  return next();
});

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().default('Жак-Ив Кусто').min(2).max(30),
    about: Joi.string().default('Исследователь').min(2).max(30),
    avatar: Joi.string().regex(URL_PATTERN)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), userController.createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), userController.login);

router.use(validateToken);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => next(new NotFoundError('По указанному пути ничего не найдено')));
router.use(errors());

module.exports = router;
