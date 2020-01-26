const db = require('../../config/database');
const Event = require('../models/Event');
const translate = require('../middleware/translate');

exports.events_get_all = (req, res, next) => {
	Event.findAll({
		order: [['date', 'ASC']]
	}).then(events => {
		console.log(events);
		res.status(200).json({
			message: 'All events were fetched',
			events: events
		});
	});
};

exports.events_get_event = (req, res, next) => {
	const eventID = req.params.eventID;
	Event.findOne({
		where: {
			eid: eventID
		}
	}).then(event => {
		if (event == null) {
			res.json({
				message: 'Error',
				error: {
					errorMessage: `No event with eventID ${eventID}`
				}
			});
		} else {
			res.status(200).json({
				message: `Event with eventID ${eventID} was fetched`,
				event: event
			});
		}
	});
};

exports.events_create_event = async (req, res, next) => {
    let translatedTitle, translatedDescription;
    try {
        translatedTitle = await translate(req.body.title);
        translatedDescription = await translate(req.body.description);
    } catch (e) {
        console.log(e);
    }
	Event.create({
		title: translatedTitle,
		description: translatedDescription,
		date: req.body.date
	}).then(event => {
		res.status(201).json({
			message: 'Event was created',
			createdEvent: event
		});
	});
};

exports.events_delete_event = (req, res, next) => {
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
};
