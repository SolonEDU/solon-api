const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');

router.post('/login', checkAuth, UsersController.users_login);

router.post('/register', checkAuth, UsersController.users_register);

router.delete('/:userID', checkAuth, UsersController.users_delete_user);

module.exports = router;
