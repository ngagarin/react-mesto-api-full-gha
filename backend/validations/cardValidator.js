const { celebrate, Joi } = require('celebrate');
const { URL_PATTERN } = require('../utils/constants');

const validateCardCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(URL_PATTERN).required(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateCardCreate,
  validateCardId,
};
