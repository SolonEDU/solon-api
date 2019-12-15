const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Proposal = require('../models/Proposal');
const checkAuth = require('../middleware/check-auth');

const ProposalsController = require('../controllers/proposals');

router.get('/', checkAuth, ProposalsController.proposals_get_all);

router.get(
	'/:proposalID',
	checkAuth,
	ProposalsController.proposals_get_proposal
);

router.post('/', checkAuth, ProposalsController.proposals_create_proposal);

router.delete(
	'/:proposalID',
	checkAuth,
	ProposalsController.proposals_delete_proposal
);

module.exports = router;
