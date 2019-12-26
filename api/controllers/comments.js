const db = require('../../config/database');
const Comment = require('../models/Comment');

exports.comments_get_all = (req, res, next) => {
	Comment.findAll().then(comments => {
		res.status(200).json({
			message: 'All comments were fetched',
			comments: comments
		});
	});
};

exports.comments_get_comment = (req, res, next) => {
	const commentID = req.params.commentID;
	Comment.findOne({
		where: {
			cid: commentID
		}
	}).then(comment => {
		if (comment == null) {
			res.json({
				message: 'Error',
				error: {
					errorMessage: `No comment with commentID ${commentID}`
				}
			});
		} else {
			res.status(200).json({
				message: `Comment with commentID ${commentID} was fetched`,
				comment: comment
			});
		}
	});
};

exports.comments_get_forumpostcomments = (req, res, next) => {
	const forumpostID = req.params.forumpostID;
	Comment.findAll({
		where: {
			fid: forumpostID
		}
	}).then(comments => {
		res.status(200).json({
			message: `All comments for forum post with forumpostID ${forumpostID} were fetched`,
			comments: comments
		});
	});
};

exports.comments_create_comment = (req, res, next) => {
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
};

exports.comments_delete_comment = (req, res, next) => {
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
};
