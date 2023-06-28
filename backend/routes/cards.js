const router = require('express').Router();
const cardController = require('../controllers/cards');
const validator = require('../validations/cardValidator');

router.get('/', cardController.getAllCards);

router.post('/', validator.validateCardCreate, cardController.createCard);

router.delete('/:cardId', validator.validateCardId, cardController.deleteCardById);

router.put('/:cardId/likes', validator.validateCardId, cardController.likeCard);

router.delete('/:cardId/likes', validator.validateCardId, cardController.dislikeCard);

module.exports = router;
