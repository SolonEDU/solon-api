const Sequelize = require('sequelize');
const db = require('../../config/database');

const Event = db.define('event', {
	eid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: Sequelize.JSONB
	},
	description: {
		type: Sequelize.JSONB
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
	},
	entitle: {
		type: Sequelize.TEXT
	},
	endescription: {
		type: Sequelize.TEXT
	}
});

module.exports = Event;
