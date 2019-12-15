const Sequelize = require('sequelize');
const db = require('../../config/database');

const Vote = db.define('vote', {
	vid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	pid: {
		type: Sequelize.INTEGER
	},
	uid: {
		type: Sequelize.INTEGER
	},
	value: {
		type: Sequelize.INTEGER
	}
});

module.exports = Vote;
