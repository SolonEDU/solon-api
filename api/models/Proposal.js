const Sequelize = require('sequelize');
const db = require('../../config/database');

const Proposal = db.define('proposal', {
	pid: {
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
	starttime: {
		type: Sequelize.DATE
	},
	endtime: {
		type: Sequelize.DATE
	},
	uid: {
		type: Sequelize.INTEGER
	},
	numyes: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	numno: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

module.exports = Proposal;
