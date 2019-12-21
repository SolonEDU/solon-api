const db = require('../../config/database');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const validator = require('email-validator');

exports.admins_login = (req, res, next) => {
	Admin.findOne({
		where: {
			username: req.body.username
		}
	}).then(admin => {
		if (admin != null) {
			bcrypt.compare(req.body.password, admin.password, (err, correct) => {
				if (correct) {
					res.status(200).json({
						message: `Admin was successfully logged in`,
						adminid: admin.adminid
					});
				} else {
					res.json({
						message: 'Error',
						error: {
							errorMessage: `Incorrect password`
						}
					});
				}
			});
		} else {
			res.json({
				message: 'Error',
				error: {
					errorMessage: `Admin with username ${req.body.username} does not exist`
				}
			});
		}
	});
};

exports.admins_register = (req, res, next) => {
	Admin.findOne({
		where: {
			username: req.body.username
		}
	}).then(admin => {
		if (admin == null) {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				Admin.create({
					username: req.body.username,
					password: hash
				}).then(admin => {
					res.status(201).json({
						message: `Admin with username ${admin.username} was registered`
					});
				});
			});
		} else {
			res.json({
				message: 'Error',
				error: {
					errorMessage: `Admin with username ${admin.username} already exists`
				}
			});
		}
	});
};

exports.admins_delete_admin = (req, res, next) => {
	const adminID = req.params.adminID;
	Admin.destroy({
		where: {
			adminid: adminID
		}
	}).then(
		res.status(200).json({
			message: `Admin with adminID ${adminID} was deleted`
		})
	);
};
