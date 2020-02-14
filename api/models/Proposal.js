const Sequelize = require('sequelize');
const db = require('../../config/database');

const Proposal = db.define('proposal', {
	pid: {
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
	},
	numvotes: {
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

module.exports = Proposal;
