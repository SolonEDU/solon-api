const db = require('../../config/database');
const Vote = require('../models/Vote');
const Proposal = require('../models/Proposal');

exports.votes_get_all = (req, res, next) => {
	Vote.findAll().then(votes => {
		res.status(200).json({
			message: 'All votes were fetched',
			votes: votes
		});
	});
};

exports.votes_get_vote = (req, res, next) => {
	const proposalID = req.params.proposalID;
	const userID = req.params.userID;
	Vote.findOne({
		where: {
			pid: proposalID,
			uid: userID
		}
	}).then(vote => {
		if (vote == null) {
			res.json({
				message: 'Error',
				error: {
					errorMessage: `No vote for proposalID ${proposalID} by userID ${userID}`
				}
			});
		} else {
			res.status(200).json({
				message: `Vote for proposalID ${proposalID} by userID ${userID} was fetched`,
				vote: vote
			});
		}
	});
};

exports.votes_create_vote = (req, res, next) => {
	const value = req.body.value;
	if (value == 0) {
		Proposal.increment(
			{ numno: 1 },
			{
				where: {
					pid: req.body.pid
				}
			}
		);
	}
	if (value == 1) {
		Proposal.increment(
			{ numyes: 1 },
			{
				where: {
					pid: req.body.pid
				}
			}
		);
	}
	Vote.create({
		pid: req.body.pid,
		uid: req.body.uid,
		value: value
	}).then(vote => {
		res.status(201).json({
			message: 'Vote was created',
			vote: vote
		});
	});
};

exports.votes_change_vote = (req, res, next) => {
	const proposalID = req.body.pid;
	const userID = req.body.uid;
	const value = req.body.value;
	if (value == 0) {
		Proposal.increment(
			{ numno: 1 },
			{
				where: {
					pid: req.body.pid
				}
			}
		);
		Proposal.decrement(
			{ numyes: 1 },
			{
				where: {
					pid: req.body.pid
				}
			}
		);
	}
	if (value == 1) {
		Proposal.increment(
			{ numyes: 1 },
			{
				where: {
					pid: req.body.pid
				}
			}
		);
		Proposal.decrement(
			{ numno: 1 },
			{
				where: {
					pid: req.body.pid
				}
			}
		);
	}
	Vote.update(
		{ value: value },
		{
			where: {
				pid: proposalID,
				uid: userID
			}
		}
	).then(vote => {
		res.status(200).json({
			message: `Vote for proposalID ${proposalID} by userID ${userID} was updated`,
			value: req.body.value
		});
	});
};

exports.votes_delete_vote = (req, res, next) => {
	const voteID = req.params.voteID;
	Vote.findOne({
		where: {
			vid: voteID
		}
	}).then(vote => {
		if (vote.value == 0) {
			Proposal.decrement(
				{ numno: 1 },
				{
					where: {
						pid: req.body.pid
					}
				}
			);
		}
		if (vote.value == 1) {
			Proposal.decrement(
				{ numyes: 1 },
				{
					where: {
						pid: req.body.pid
					}
				}
			);
		}
	});
	Vote.destroy({
		where: {
			vid: voteID
		}
	}).then(
		res.status(200).json({
			message: `Vote with voteID ${voteID} was deleted`
		})
	);
};
