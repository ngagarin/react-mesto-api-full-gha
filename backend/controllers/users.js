const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { SUCCESSFUL_REQUEST, CREATED } = require('../utils/constants');
const { NODE_ENV, JWT_SECRET } = require('../config');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require('../utils/errors/index');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const { _id, name, about, avatar, email } = user;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
        .send({ _id, name, about, avatar, email });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: true,
    secure: true,
  });
  return res.status(200).json({ message: 'Деавторизация прошла успешно.' });
};

const getAllUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.status(SUCCESSFUL_REQUEST).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  let userId;
  if (req.params.userId) userId = req.params.userId;
  else userId = req.user._id;

  userModel
    .findById(userId)
    .orFail(new NotFoundError(`Пользователь с id:${userId} не найден`))
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные пользователя'));
      }
      return next(new Error('Произошла ошибка на сервере.'));
    });
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => userModel
      .create({
        ...req.body, password: hash,
      }))
    .then(({
      _id,
      name,
      about,
      avatar,
      email,
    }) => {
      res.status(CREATED).send(
        {
          data: {
            _id,
            name,
            about,
            avatar,
            email,
          },
        },
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с указанным email уже зарегистрирован'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные пользователя'));
      }
      return next(new Error('Произошла ошибка на сервере.'));
    });
};

const updateUserInfo = (update) => (req, res, next) => {
  update(req)
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные пользователя'));
      }
      return next(new Error('Произошла ошибка на сервере.'));
    });
};

const updateProfile = updateUserInfo((req) => {
  const { name, about } = req.body;
  return userModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).orFail(new NotFoundError(`Пользователь с id:${req.user._id} не найден`));
});

const updateAvatar = updateUserInfo((req) => {
  const { avatar } = req.body;
  return userModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  ).orFail(new NotFoundError(`Пользователь с id:${req.user._id} не найден`));
});

module.exports = {
  login,
  logout,
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
