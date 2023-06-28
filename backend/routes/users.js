const router = require('express').Router();
const userController = require('../controllers/users');
const validator = require('../validations/userValidator');

router.get('/me', userController.getUserById);

router.patch('/me', validator.validateUserUpdate, userController.updateProfile);

router.get('/', userController.getAllUsers);

router.get('/:userId', validator.validateUserId, userController.getUserById);

router.patch('/me/avatar', validator.validateAvatarUpdate, userController.updateAvatar);

module.exports = router;
