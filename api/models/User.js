const Sequelize = require('sequelize');
const db = require('../../config/database');

const User = db.define('user', {
	uid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	firstname: {
		type: Sequelize.STRING
	},
	lastname: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	lang: {
		type: Sequelize.STRING
	}
});

module.exports = User;
