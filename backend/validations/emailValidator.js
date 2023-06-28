const validator = require('validator');
const { BadRequestError } = require('../utils/errors/index');

module.exports = (email) => {
  if (validator.isEmail(email)) {
    throw new BadRequestError('Неверный формат email');
  }
  return true;
};
