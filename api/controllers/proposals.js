const db = require('../../config/database');
const Proposal = require('../models/Proposal');

exports.proposals_get_all = (req, res, next) => {
	Proposal.findAll({
		order: [['starttime', 'DESC']]
	}).then(proposals => {
		res.status(200).json({
			message: 'All proposals were fetched',
			proposals: proposals
		});
	});
};

exports.proposals_get_proposal = (req, res, next) => {
	const proposalID = req.params.proposalID;
	Proposal.findOne({
		where: {
			pid: proposalID
		}
	}).then(proposal => {
		if (proposal == null) {
			res.json({
				message: 'Error',
				error: {
					errorMessage: `No proposal with proposalID ${proposalID}`
				}
			});
		} else {
			res.status(200).json({
				message: `Proposal with proposalID ${proposalID} was fetched`,
				proposal: proposal
			});
		}
	});
};

exports.proposals_create_proposal = (req, res, next) => {
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
};

exports.proposals_delete_proposal = (req, res, next) => {
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
};