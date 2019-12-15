const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Proposal = require('../models/Proposal');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	Proposal.findAll().then(proposals => {
		res.status(200).json({
			message: 'All proposals were fetched',
			proposals: proposals
		});
	});
});

router.get('/:proposalID', checkAuth, (req, res, next) => {
	const proposalID = req.params.proposalID;
	Proposal.findOne({
		where: {
			pid: proposalID
		}
	}).then(proposal => {
		if (proposal == null) {
			res.status(200).json({
				message: `No proposal with proposalID ${proposalID}`
			});
		} else {
			res.status(200).json({
				message: `Proposal with proposalID ${proposalID} was fetched`,
				proposal: proposal
			});
		}
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
			proposal: proposal
		});
	});
});

router.delete('/:proposalID', checkAuth, (req, res, next) => {
	const proposalID = req.params.proposalID;
	Proposal.destroy({
		where: {
			pid: proposalID
		}
	}).then(
		res.status(200).json({
			message: `Proposal with proposalID ${proposalID} was deleted`
		})
	);
});

module.exports = router;
