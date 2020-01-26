require('dotenv').config();
const db = require('../../config/database');
const Proposal = require('../models/Proposal');
var googleTranslate = require('google-translate')(process.env.GOOGLE_CLOUD_KEY);

const translate = async (text, target) => {
    return new Promise((resolve, reject) => {
        googleTranslate.translate(text, target, (err, res) => {
            if (err) reject(err);
            else resolve(res.translatedText);
        });
    });
}

const toTranslationMap = async (text) => {
    var translations = new Object();
    const langCodeMap = {
        'en': 'en',
        'zhcn': 'zh-CN',
        'zhtw': 'zh-TW',
        'bn': 'bn',
        'ko': 'ko',
        'ru': 'ru',
        'ja': 'ja',
        'uk': 'uk'
    };
    for (var key in langCodeMap) {
        const translation = await translate(text, langCodeMap[key])
        translations[key] = translation;
        console.log(translations[key]);
    }
    return translations
}

toTranslationMap('hello').then((translated) => {
    console.log(translated);
});

// translate = source => {
//     var translations = new Object();
//     googleTranslate.translate(source, 'en', function(err, translation) {
//         translations.en = translation.translatedText;
//         googleTranslate.translate(source, 'zh-CN', function(err, translation) {
//             translations.zhcn = translation.translatedText;
//             googleTranslate.translate(source, 'zh-TW', function(
//                 err,
//                 translation
//             ) {
//                 translations.zhtw = translation.translatedText;
//                 googleTranslate.translate(source, 'bn', function(
//                     err,
//                     translation
//                 ) {
//                     translations.bn = translation.translatedText;
//                     googleTranslate.translate(source, 'ko', function(
//                         err,
//                         translation
//                     ) {
//                         translations.ko = translation.translatedText;
//                         googleTranslate.translate(source, 'ru', function(
//                             err,
//                             translation
//                         ) {
//                             translations.ru = translation.translatedText;
//                             googleTranslate.translate(source, 'ja', function(
//                                 err,
//                                 translation
//                             ) {
//                                 translations.ja = translation.translatedText;
//                                 googleTranslate.translate(
//                                     source,
//                                     'uk',
//                                     function(err, translation) {
//                                         translations.uk =
//                                             translation.translatedText;
//                                         var translated = JSON.stringify(
//                                             translations
// 										);
// 										return translated;
//                                     }
//                                 );
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// };

exports.proposals_get_all = (req, res, next) => {
    Proposal.findAll({
        order: [['starttime', 'DESC']]
    }).then(proposals => {
        res.status(200).json({
            message: 'All proposals were fetched',
            proposals: proposals
        });
    });
};

exports.proposals_get_proposal = (req, res, next) => {
    const proposalID = req.params.proposalID;
    Proposal.findOne({
        where: {
            pid: proposalID
        }
    }).then(proposal => {
        if (proposal == null) {
            res.json({
                message: 'Error',
                error: {
                    errorMessage: `No proposal with proposalID ${proposalID}`
                }
            });
        } else {
            res.status(200).json({
                message: `Proposal with proposalID ${proposalID} was fetched`,
                proposal: proposal
            });
        }
    });
};

exports.proposals_create_proposal = async (req, res, next) => {
	const translatedTitle = await toTranslationMap(req.body.title);
	const translatedDescription = await toTranslationMap(req.body.description);
	console.log(translatedTitle);
    Proposal.create({
        title: translatedTitle,
        description: translatedDescription,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        uid: req.body.uid
    }).then(proposal => {
        res.status(201).json({
            message: 'Proposal was created',
            proposal: proposal
        });
    });
};

exports.proposals_delete_proposal = (req, res, next) => {
    const proposalID = req.params.proposalID;
    Proposal.destroy({
        where: {
            pid: proposalID
        }
    }).then(
        res.status(200).json({
            message: `Proposal with proposalID ${proposalID} was deleted`
        })
    );
};
