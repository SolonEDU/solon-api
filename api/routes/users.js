const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');

router.get('/', checkAuth, UsersController.users_get_all);

router.post('/login', checkAuth, UsersController.users_login);

router.post('/register', checkAuth, UsersController.users_register);

router.patch('/language', checkAuth, UsersController.users_change_language);

router.delete('/:userID', checkAuth, UsersController.users_delete_user);

module.exports = router;
