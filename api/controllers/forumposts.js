const db = require('../../config/database');
const Forumpost = require('../models/Forumpost');
const translate = require('../middleware/translate');

exports.forumposts_get_all = (req, res, next) => {
    Forumpost.findAll().then(forumposts => {
        res.status(200).json({
            message: 'All forumposts were fetched',
            forumposts: forumposts
        });
    });
};

exports.forumposts_get_forumpost = (req, res, next) => {
    const forumpostID = req.params.forumpostID;
    Forumpost.findOne({
        where: {
            fid: forumpostID
        }
    }).then(forumpost => {
        if (forumpost == null) {
            res.json({
                message: 'Error',
                error: {
                    errorMessage: `No forumpost with forumpostID ${forumpostID}`
                }
            });
        } else {
            res.status(200).json({
                message: `forumpost with forumpostID ${forumpostID} was fetched`,
                forumpost: forumpost
            });
        }
    });
};

exports.forumposts_create_forumpost = async (req, res, next) => {
    let translatedTitle, translatedDescription;
    try {
        translatedTitle = await translate(req.body.title);
        translatedDescription = await translate(req.body.description);
    } catch (e) {
        console.log(e);
    }
    console.log(translatedTitle);
    console.log(translatedDescription);
    Forumpost.create({
        title: translatedTitle,
        description: translatedDescription,
        timestamp: req.body.timestamp,
        uid: req.body.uid
    }).then(forumpost => {
        res.status(201).json({
            message: 'Forumpost was created',
            forumpost: forumpost
        });
    });
};

exports.forumposts_delete_forumpost = (req, res, next) => {
    const forumpostID = req.params.forumpostID;
    Forumpost.destroy({
        where: {
            fid: forumpostID
        }
    }).then(
        res.status(200).json({
            message: `Forumpost with forumpostID ${forumpostID} was deleted`
        })
    );
};
