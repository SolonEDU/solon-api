const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const VotesController = require('../controllers/votes');

router.get('/', checkAuth, VotesController.votes_get_all);

router.get('/:proposalID/:userID', checkAuth, VotesController.votes_get_vote);

router.post('/', checkAuth, VotesController.votes_create_vote);

router.patch('/', checkAuth, VotesController.votes_change_vote);

module.exports = router;
