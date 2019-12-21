const db = require('../../config/database');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('email-validator');

exports.users_login = (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (user != null) {
			bcrypt.compare(req.body.password, user.password, (err, correct) => {
				if (correct) {
					res.status(200).json({
						message: `User was successfully logged in`,
						uid: user.uid
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
					errorMessage: `User with email ${req.body.email} does not exist`
				}
			});
		}
	});
};

exports.users_register = (req, res, next) => {
	if (!validator.validate(req.body.email)) {
		res.json({
			message: 'Error',
			error: {
				errorMessage: 'Invalid email address'
			}
		});
	} else {
		User.findOne({
			where: {
				email: req.body.email
			}
		}).then(user => {
			if (user == null) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					User.create({
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						email: req.body.email,
						password: hash,
						lang: req.body.lang
					}).then(user => {
						res.status(201).json({
							message: `User with email ${user.email} was registered`
						});
					});
				});
			} else {
				res.json({
					message: 'Error',
					error: {
						errorMessage: `User with email ${user.email} already exists`
					}
				});
			}
		});
	}
};
