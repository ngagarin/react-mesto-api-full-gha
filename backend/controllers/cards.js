const mongoose = require('mongoose');
const cardModel = require('../models/card');
const { SUCCESSFUL_REQUEST, CREATED } = require('../utils/constants');
const {
  BadRequestError,
  ForbidenError,
  NotFoundError,
} = require('../utils/errors/index');

const getAllCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => res.status(SUCCESSFUL_REQUEST).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные карточки'));
      }
      return next(new Error('Произошла ошибка на сервере.'));
    });
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  cardModel
    .findById(cardId)
    .orFail(new NotFoundError('Не найдена карточка с указанным _id.'))
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        return next(new ForbidenError('Нельзя удалять чужую карточку'));
      }
      return cardModel.findByIdAndRemove(card);
    })
    .then((card) => res.status(SUCCESSFUL_REQUEST).send({ message: `Карточка _id:${card._id} удалена` }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные карточки'));
      }
      return next(new Error('Произошла ошибка на сервере.'));
    });
};

const likeCard = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(new NotFoundError('Не найдена карточка с указанным _id.'))
    .then((card) => res.status(SUCCESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные карточки'));
      }
      return next(new Error('Произошла ошибка на сервере.'));
    });
};

const dislikeCard = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(new NotFoundError('Не найдена карточка с указанным _id.'))
    .then((card) => res.status(SUCCESSFUL_REQUEST).send(card))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные карточки'));
      }
      return next(new Error('Произошла ошибка на сервере.'));
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
