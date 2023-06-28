const router = require('express').Router();
const userController = require('../controllers/users');

router.post('/logout', userController.logout);

module.exports = router;
