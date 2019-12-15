const express = require('express');
const router = express.Router();
const db = require('../../config/database');
const Comment = require('../models/Comment');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
	Comment.findAll().then(comments => {
		res.status(200).json({
			message: 'All comments were fetched',
			comments: comments
		});
	});
});

router.get('/:commentID', checkAuth, (req, res, next) => {
	const commentID = req.params.commentID;
	Comment.findOne({
		where: {
			cid: commentID
		}
	}).then(comment => {
		if (comment == null) {
			res.status(200).json({
				message: `No comment with commentID ${commentID}`
			});
		} else {
			res.status(200).json({
				message: `Comment with commentID ${commentID} was fetched`,
				comment: comment
			});
		}
	});
});

router.post('/', checkAuth, (req, res, next) => {
	Comment.create({
		fid: req.body.fid,
		content: req.body.content,
		timestamp: req.body.timestamp,
		uid: req.body.uid
	}).then(comment => {
		res.status(201).json({
			message: 'Comment was created',
			comment: comment
		});
	});
});

router.delete('/:commentID', checkAuth, (req, res, next) => {
	const commentID = req.params.commentID;
	Comment.destroy({
		where: {
			cid: commentID
		}
	}).then(
		res.status(200).json({
			message: `Comment with commentID ${commentID} was deleted`
		})
	);
});

module.exports = router;
