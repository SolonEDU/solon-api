const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CommentsController = require('../controllers/comments');

router.get('/', checkAuth, CommentsController.comments_get_all);

router.get('/:commentID', checkAuth, CommentsController.comments_get_comment);

router.get(
	'/forumpost/:forumpostID',
	checkAuth,
	CommentsController.comments_get_forumpostcomments
);

router.post('/', checkAuth, CommentsController.comments_create_comment);

router.delete('/:commentID', checkAuth, CommentsController.comments_get_all);

module.exports = router;
