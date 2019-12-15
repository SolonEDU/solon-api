const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Event = require('../models/Event');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	Event.findAll().then(events => {
		console.log(events);
		res.status(200).json({
			message: 'Events were fetched',
			events: events
		});
	});
});

router.post('/', checkAuth, (req, res, next) => {
	Event.create({
		title: req.body.title,
		description: req.body.description,
		date: req.body.date
	}).then(event => {
		res.status(201).json({
			message: 'Event was created',
			createdEvent: event
		});
	});
});

router.get('/:eventID', checkAuth, (req, res, next) => {
	const eventID = req.params.eventID;
	res.status(200).json({
		message: 'You passed an ID',
		id: eventID
	});
});

router.patch('/:eventID', checkAuth, (req, res, next) => {
	const eventID = req.params.eventID;
	res.status(200).json({
		message: 'Updated event!',
		id: eventID
	});
});

router.delete('/:eventID', checkAuth, (req, res, next) => {
	const eventID = req.params.eventID;
	res.status(200).json({
		message: 'Deleted event!',
		id: eventID
	});
});

module.exports = router;
