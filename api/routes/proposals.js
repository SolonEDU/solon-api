const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Proposal = require('../models/Proposal');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	Proposal.findAll().then(proposals => {
		console.log(proposals);
		res.status(200).json({
			message: 'Proposals were fetched',
			proposals: proposals
		});
	});
});

router.post('/', checkAuth, (req, res, next) => {
	Proposal.create({
		title: req.body.title,
		description: req.body.description,
		starttime: req.body.starttime,
		endtime: req.body.endtime,
		uid: req.body.uid
	}).then(proposal => {
		res.status(201).json({
			message: 'Proposal was created',
			createdProposal: proposal
		});
	});
});

router.get('/:proposalID', checkAuth, (req, res, next) => {
	const proposalID = req.params.proposalID;
	res.status(200).json({
		message: 'You passed an ID',
		id: proposalID
	});
});

router.patch('/:proposalID', checkAuth, (req, res, next) => {
	const proposalID = req.params.proposalID;
	res.status(200).json({
		message: 'Updated proposal!',
		id: proposalID
	});
});

router.delete('/:proposalID', checkAuth, (req, res, next) => {
	const proposalID = req.params.proposalID;
	res.status(200).json({
		message: 'Deleted proposal!',
		id: proposalID
	});
});

module.exports = router;
