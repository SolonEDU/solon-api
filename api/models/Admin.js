const Sequelize = require('sequelize');
const db = require('../../config/database');

const Admin = db.define('admin', {
	adminid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
});

module.exports = Admin;
