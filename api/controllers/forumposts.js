const db = require('../../config/database');
const Forumpost = require('../models/Forumpost');
const translate = require('../middleware/translate');
const { Op } = require('sequelize');

exports.forumposts_get_all = (req, res, next) => {
    const q = req.query.q;
    if (q) {
        Proposal.findAll({
            where: {
                [Op.or]: [
                    {
                        entitle: {
                            [Op.like]: '%' + q + '%'
                        }
                    },
                    {
                        endescription: {
                            [Op.like]: '%' + q + '%'
                        }
                    }
                ]
            }
        }).then(proposals => {
            res.status(200).json({
                message:
                    'All proposals with search query in title or description were fetched',
                proposals: proposals
            });
        });
    } else {
        const sort = req.query.sort_by;
        if (sort == 'timestamp.asc') {
            Forumpost.findAll({
                order: [['timestamp', 'ASC']]
            }).then(forumposts => {
                res.status(200).json({
                    message:
                        'All forumposts were fetched in order of timestamp ascending',
                    forumposts: forumposts
                });
            });
        } else if (sort == 'timestamp.desc') {
            Forumpost.findAll({
                order: [['timestamp', 'DESC']]
            }).then(forumposts => {
                res.status(200).json({
                    message:
                        'All forumposts were fetched in order of timestamp descending',
                    forumposts: forumposts
                });
            });
        } else if (sort == 'numcomments.asc') {
            Forumpost.findAll({
                order: [['numcomments', 'ASC']]
            }).then(forumposts => {
                res.status(200).json({
                    message:
                        'All forumposts were fetched in order of numcomments ascending',
                    forumposts: forumposts
                });
            });
        } else if (sort == 'numcomments.desc') {
            Forumpost.findAll({
                order: [['numcomments', 'DESC']]
            }).then(forumposts => {
                res.status(200).json({
                    message:
                        'All forumposts were fetched in order of numcomments descending',
                    forumposts: forumposts
                });
            });
        } else {
            res.json({
                message: 'Error',
                error: {
                    errorMessage: `Invalid or no sort_by query string`
                }
            });
        }
    }
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
        numcomments: 0,
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
