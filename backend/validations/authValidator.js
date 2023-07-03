const { celebrate, Joi } = require('celebrate');
const { URL_PATTERN } = require('../utils/constants');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(URL_PATTERN),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
};
