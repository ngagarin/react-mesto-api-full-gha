const SUCСESSFUL_REQUEST = 200;
const CREATED = 201;
const URL_PATTERN = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://mesto.ngagarin.com',
  'https://mesto.ngagarin.com',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  SUCСESSFUL_REQUEST,
  CREATED,
  URL_PATTERN,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
