const { celebrate, Joi } = require('celebrate');
const { URL_PATTERN } = require('../utils/constants');

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(URL_PATTERN).required(),
  }),
});

module.exports = {
  validateUserUpdate,
  validateUserId,
  validateAvatarUpdate,
};
