const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Event = require('../models/Event');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	Event.findAll().then(events => {
		console.log(events);
		res.status(200).json({
			message: 'All events were fetched',
			events: events
		});
	});
});

router.get('/:eventID', checkAuth, (req, res, next) => {
	const eventID = req.params.eventID;
	Event.findOne({
		where: {
			eid: eventID
		}
	}).then(event => {
		if (event == null) {
			res.status(200).json({
				message: `No event with eventID ${eventID}`
			});
		} else {
			res.status(200).json({
				message: `Event with eventID ${eventID} was fetched`,
				event: event
			});
		}
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

router.delete('/:eventID', checkAuth, (req, res, next) => {
	const eventID = req.params.eventID;
	Event.destroy({
		where: {
			eid: eventID
		}
	}).then(
		res.status(200).json({
			message: `Event with eventID ${eventID} was deleted`
		})
	);
});

module.exports = router;
