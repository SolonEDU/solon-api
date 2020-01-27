require('dotenv').config();
var googleTranslate = require('google-translate')(process.env.GOOGLE_CLOUD_KEY);

translate = async (text, target) => {
    return new Promise((resolve, reject) => {
        googleTranslate.translate(text, target, (err, res) => {
            if (err) reject(err);
            else resolve(res.translatedText);
        });
    });
};

module.exports = async text => {
    let translations = new Object();
    const langCodeMap = {
        en: 'en',
        zhcn: 'zh-CN',
        zhtw: 'zh-TW',
        bn: 'bn',
        ko: 'ko',
        ru: 'ru',
        ja: 'ja',
        uk: 'uk'
    };
    for (let key in langCodeMap) {
        const translation = await translate(text, langCodeMap[key]);
        translations[key] = translation;
    }
    return JSON.stringify(translations);
};