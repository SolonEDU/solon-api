const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Attender = require('../models/Attender');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	Attender.findAll().then(attenders => {
		res.status(200).json({
			message: 'All attenders were fetched',
			attenders: attenders
		});
	});
});

router.get('/:eventID/:userID', checkAuth, (req, res, next) => {
	const eventID = req.params.eventID;
	const userID = req.params.userID;
	Attender.findOne({
		where: {
			eid: eventID,
			uid: userID
		}
	}).then(attender => {
		if (attender == null) {
			res.status(200).json({
				message: `No attender for eventID ${eventID} by userID ${userID}`
			});
		} else {
			res.status(200).json({
				message: `Attender for eventID ${eventID} by userID ${userID} was fetched`,
				attender: attender
			});
		}
	});
});

router.post('/', checkAuth, (req, res, next) => {
	Attender.create({
		eid: req.body.eid,
		uid: req.body.uid
	}).then(attender => {
		res.status(201).json({
			message: 'Attender was created',
			attender: attender
		});
	});
});

router.delete('/:eventID/:userID', checkAuth, (req, res, next) => {
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
});

module.exports = router;
