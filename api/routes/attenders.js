const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Attender = require('../models/Attender');
const checkAuth = require('../middleware/check-auth');

const AttendersController = require('../controllers/attenders');

router.get('/', checkAuth, AttendersController.attenders_get_all);

router.get(
	'/:eventID/:userID',
	checkAuth,
	AttendersController.attenders_get_attender
);

router.post('/', checkAuth, AttendersController.attenders_create_attender);

router.delete(
	'/:eventID/:userID',
	checkAuth,
	AttendersController.attenders_delete_attender
);

module.exports = router;
