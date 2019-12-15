const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Comment = require('../models/Comment');
const checkAuth = require('../middleware/check-auth');

const CommentsController = require('../controllers/comments');

router.get('/', checkAuth, CommentsController.comments_get_all);

router.get('/:commentID', checkAuth, CommentsController.comments_get_comment);

router.post('/', checkAuth, CommentsController.comments_create_comment);

router.delete('/:commentID', checkAuth, CommentsController.comments_get_all);

module.exports = router;
