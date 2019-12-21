const db = require('../../config/database');
const Attender = require('../models/Attender');

exports.attenders_get_all = (req, res, next) => {
	Attender.findAll().then(attenders => {
		res.status(200).json({
			message: 'All attenders were fetched',
			attenders: attenders
		});
	});
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
