const router = require('express').Router();
const { errors } = require('celebrate');
const authRouter = require('./auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const logoutRouter = require('./logout');
const { validateToken } = require('../middlewares/auth');
const { clearToken } = require('../middlewares/logout');
const { NotFoundError } = require('../utils/errors/index');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', authRouter);
router.use(validateToken);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', clearToken, logoutRouter);
router.use('*', (req, res, next) => next(new NotFoundError('По указанному пути ничего не найдено')));
router.use(errors());

module.exports = router;
