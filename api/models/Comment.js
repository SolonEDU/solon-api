const Sequelize = require('sequelize');
const db = require('../../config/database');

const Comment = db.define('comment', {
	cid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fid: {
		type: Sequelize.INTEGER
	},
	content: {
		type: Sequelize.TEXT
	},
	timestamp: {
		type: Sequelize.DATE
	},
	uid: {
		type: Sequelize.INTEGER
	}
});

module.exports = Comment;
