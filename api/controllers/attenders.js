const db = require('../../config/database');
const Attender = require('../models/Attender');
const Event = require('../models/Event');

exports.attenders_get_all = (req, res, next) => {
	eid = req.query.eid;
	if (eid != null) {
		Attender.findAll({
			where: {
				eid: eid
			}
		}).then(attenders => {
			res.status(200).json({
				message: `All attenders for event with eventID ${eid} were fetched`,
				attenders: attenders
			});
		});
	} else {
		Attender.findAll().then(attenders => {
			res.status(200).json({
				message: 'All attenders were fetched',
				attenders: attenders
			});
		});
	}
};

exports.attenders_get_attender = (req, res, next) => {
	const eventID = req.params.eventID;
	const userID = req.params.userID;
	Attender.findOne({
		where: {
			eid: eventID,
			uid: userID
		}
	}).then(attender => {
		if (attender == null) {
			res.json({
				message: 'Error',
				error: {
					errorMessage: `No attender for eventID ${eventID} by userID ${userID}`
				}
			});
		} else {
			res.status(200).json({
				message: `Attender for eventID ${eventID} by userID ${userID} was fetched`,
				attender: attender
			});
		}
	});
};

exports.attenders_create_attender = (req, res, next) => {
	Event.increment(
		{ numattenders: 1 },
		{
			where: {
				eid: req.body.eid
			}
		}
	);
	Attender.create({
		eid: req.body.eid,
		uid: req.body.uid
	}).then(attender => {
		res.status(201).json({
			message: 'Attender was created',
			attender: attender
		});
	});
};

exports.attenders_delete_attender = (req, res, next) => {
	const eventID = req.params.eventID;
	const userID = req.params.userID;
	Event.decrement(
		{ numattenders: 1 },
		{
			where: {
				eid: eventID
			}
		}
	);
	Attender.destroy({
		where: {
			eid: eventID,
			uid: userID
		}
	}).then(
		res.status(200).json({
			message: `Attender for eventID ${eventID} by userID ${userID} was deleted`
		})
	);
};
