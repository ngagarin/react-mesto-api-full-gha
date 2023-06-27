const SUCCESSFUL_REQUEST = 200;
const CREATED = 201;
const URL_PATTERN = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
const allowedCors = [
  'http://localhost:3001',
  'https://localhost:3001',
  'http://mesto.ngagarin.com',
  'https://mesto.ngagarin.com',
  'http://ngagarin.nomoredomains.rocks',
  'https://ngagarin.nomoredomains.rocks',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  SUCCESSFUL_REQUEST,
  CREATED,
  URL_PATTERN,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
