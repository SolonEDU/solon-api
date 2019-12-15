const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Forumpost = require('../models/Forumpost');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	Forumpost.findAll().then(forumposts => {
		res.status(200).json({
			message: 'All forumposts were fetched',
			forumposts: forumposts
		});
	});
});

router.get('/:forumpostID', checkAuth, (req, res, next) => {
	const forumpostID = req.params.forumpostID;
	Forumpost.findOne({
		where: {
			fid: forumpostID
		}
	}).then(forumpost => {
		if (forumpost == null) {
			res.status(200).json({
				message: `No forumpost with forumpostID ${forumpostID}`
			});
		} else {
			res.status(200).json({
				message: `forumpost with forumpostID ${forumpostID} was fetched`,
				forumpost: forumpost
			});
		}
	});
});

router.post('/', checkAuth, (req, res, next) => {
	Forumpost.create({
		title: req.body.title,
		description: req.body.description,
		timestamp: req.body.timestamp,
		uid: req.body.uid
	}).then(forumpost => {
		res.status(201).json({
			message: 'Forumpost was created',
			forumpost: forumpost
		});
	});
});

router.delete('/:forumpostID', checkAuth, (req, res, next) => {
	const forumpostID = req.params.forumpostID;
	Forumpost.destroy({
		where: {
			fid: forumpostID
		}
	}).then(
		res.status(200).json({
			message: `Forumpost with forumpostID ${forumpostID} was deleted`
		})
	);
});

module.exports = router;
