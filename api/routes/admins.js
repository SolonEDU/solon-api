const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const AdminsController = require('../controllers/admins');

router.get('/:adminID', checkAuth, AdminsController.admins_get_admin);

router.post('/login', checkAuth, AdminsController.admins_login);

router.post('/register', checkAuth, AdminsController.admins_register);

router.delete('/:adminID', checkAuth, AdminsController.admins_delete_admin);

module.exports = router;
