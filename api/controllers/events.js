const db = require('../../config/database');
const Event = require('../models/Event');
const translate = require('../middleware/translate');
const { Op } = require('sequelize');

exports.events_get_all = (req, res, next) => {
    const q = req.query.q;
    if (q) {
        Event.findAll({
            where: {
                [Op.or]: [
                    {
                        entitle: {
                            [Op.iLike]: '%' + q + '%'
                        }
                    },
                    {
                        endescription: {
                            [Op.iLike]: '%' + q + '%'
                        }
                    }
                ]
            }
        }).then(events => {
            res.status(200).json({
                message:
                    'All events with search query in title or description were fetched',
                events: events
            });
        });
    } else {
        const sort = req.query.sort_by;
        if (sort == 'numattenders.asc') {
            Event.findAll({
                order: [['numattenders', 'ASC']]
            }).then(events => {
                console.log(events);
                res.status(200).json({
                    message:
                        'All events were fetched in order of numattenders ascending',
                    events: events
                });
            });
        } else if (sort == 'numattenders.desc') {
            Event.findAll({
                order: [['numattenders', 'DESC']]
            }).then(events => {
                console.log(events);
                res.status(200).json({
                    message:
                        'All events were fetched in order of numattenders descending',
                    events: events
                });
            });
        } else if (sort == 'date.asc') {
            Event.findAll({
                order: [['date', 'ASC']]
            }).then(events => {
                console.log(events);
                res.status(200).json({
                    message:
                        'All events were fetched in order of date ascending',
                    events: events
                });
            });
        } else if (sort == 'date.desc') {
            Event.findAll({
                order: [['date', 'DESC']]
            }).then(events => {
                console.log(events);
                res.status(200).json({
                    message:
                        'All events were fetched in order of date descending',
                    events: events
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

exports.events_get_event = (req, res, next) => {
    const eventID = req.params.eventID;
    Event.findOne({
        where: {
            eid: eventID
        }
    }).then(event => {
        if (event == null) {
            res.json({
                message: 'Error',
                error: {
                    errorMessage: `No event with eventID ${eventID}`
                }
            });
        } else {
            res.status(200).json({
                message: `Event with eventID ${eventID} was fetched`,
                event: event
            });
        }
    });
};

exports.events_create_event = async (req, res, next) => {
    let translatedTitle, translatedDescription;
    try {
        translatedTitle = await translate(req.body.title);
        translatedDescription = await translate(req.body.description);
    } catch (e) {
        console.log(e);
    }
    Event.create({
        title: translatedTitle,
        description: translatedDescription,
        date: req.body.date,
        entitle: JSON.parse(translatedTitle)['en'],
        endescription: JSON.parse(translatedDescription)['en']
    }).then(event => {
        res.status(201).json({
            message: 'Event was created',
            createdEvent: event
        });
    });
};

exports.events_delete_event = (req, res, next) => {
    const eventID = req.params.eventID;
    Event.destroy({
        where: {
            eid: eventID
        }
    }).then(
        res.status(200).json({
            message: `Event with eventID ${eventID} was deleted`
        })
    );
};
