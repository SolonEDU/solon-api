const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Vote = require('../models/Vote');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	Vote.findAll().then(votes => {
		res.status(200).json({
			message: 'All votes were fetched',
			votes: votes
		});
	});
});

router.get('/:proposalID/:userID', checkAuth, (req, res, next) => {
	const proposalID = req.params.proposalID;
	const userID = req.params.userID;
	Vote.findOne({
		where: {
			pid: proposalID,
			uid: userID
		}
	}).then(vote => {
		if (vote == null) {
			res.status(200).json({
				message: `No vote for proposalID ${proposalID} by userID ${userID}`
			});
		} else {
			res.status(200).json({
				message: `Vote for proposalID ${proposalID} by userID ${userID} was fetched`,
				vote: vote
			});
		}
	});
});

router.post('/', checkAuth, (req, res, next) => {
	Vote.create({
		pid: req.body.pid,
		uid: req.body.uid,
		value: req.body.value
	}).then(vote => {
		res.status(201).json({
			message: 'Vote was created',
			vote: vote
		});
	});
});

router.patch('/', checkAuth, (req, res, next) => {
	const proposalID = req.body.pid;
	const userID = req.body.uid;
	Vote.update(
		{ value: req.body.value },
		{
			where: {
				pid: proposalID,
				uid: userID
			}
		}
	).then(vote => {
		res.status(200).json({
			message: `Vote for proposalID ${proposalID} by userID ${userID} was updated`,
			vote: vote
		});
	});
});

module.exports = router;
