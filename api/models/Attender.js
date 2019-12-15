const Sequelize = require('sequelize');
const db = require('../../config/database');

const Attender = db.define('attender', {
	aid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	eid: {
		type: Sequelize.INTEGER
	},
	uid: {
		type: Sequelize.INTEGER
	}
});

module.exports = Attender;
