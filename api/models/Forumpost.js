const Sequelize = require('sequelize');
const db = require('../../config/database');

const Forumpost = db.define('forumpost', {
	fid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.TEXT
	},
	timestamp: {
		type: Sequelize.DATE
	},
	uid: {
		type: Sequelize.INTEGER
	}
});

module.exports = Forumpost;
