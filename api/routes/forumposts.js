const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ForumpostsController = require('../controllers/forumposts');

router.get('/', checkAuth, ForumpostsController.forumposts_get_all);

router.get(
	'/:forumpostID',
	checkAuth,
	ForumpostsController.forumposts_get_forumpost
);

router.post('/', checkAuth, ForumpostsController.forumposts_create_forumpost);

router.delete(
	'/:forumpostID',
	checkAuth,
	ForumpostsController.forumposts_delete_forumpost
);

module.exports = router;
