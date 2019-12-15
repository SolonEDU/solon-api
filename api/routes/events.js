const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Event = require('../models/Event');
const checkAuth = require('../middleware/check-auth');

const EventsController = require('../controllers/events');

router.get('/', checkAuth, EventsController.events_get_all);

router.get('/:eventID', EventsController.events_get_event);

router.post('/', checkAuth, EventsController.events_create_event);

router.delete('/:eventID', checkAuth, EventsController.events_delete_event);

module.exports = router;
