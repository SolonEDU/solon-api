const Sequelize = require('sequelize');
const db = require('../../config/database');

const Event = db.define('event', {
	eid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	date: {
		type: Sequelize.DATE
	},
	datecreated: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	numattenders: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

module.exports = Event;
