const db = require('../../config/database');
const Comment = require('../models/Comment');
const Forumpost = require('../models/Forumpost');
const translate = require('../middleware/translate');

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
        },
        order: [['timestamp', 'DESC']]
    }).then(comments => {
        res.status(200).json({
            message: `All comments for forum post with forumpostID ${forumpostID} were fetched`,
            comments: comments
        });
    });
};

exports.comments_create_comment = async (req, res, next) => {
    let translatedContent;
    try {
        translatedContent = await translate(req.body.content);
    } catch (e) {
        console.log(e);
    }
    Forumpost.increment(
        { numcomments: 1 },
        {
            where: {
                fid: req.body.fid
            }
        }
    );
    Comment.create({
        fid: req.body.fid,
        content: translatedContent,
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
    Comment.findOne({
        where: {
            cid: commentID
        }
    })
        .then(comment => {
            Forumpost.decrement(
                { numcomments: 1 },
                {
                    where: {
                        fid: comment.fid
                    }
                }
            );
        })
        .then(
            Comment.destroy({
                where: {
                    cid: commentID
                }
            }).then(
                res.status(200).json({
                    message: `Comment with commentID ${commentID} was deleted`
                })
            )
        );
};
