const db = require('../../config/database');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('email-validator');

exports.users_get_all = (req, res, next) => {
	User.findAll().then(users => {
		res.status(200).json({
			message: 'All users were fetched',
			users: users
		});
	});
};

exports.users_get_user = (req, res, next) => {
	userID = req.params.userID;
	User.findOne({
		where: {
			uid: userID
		},
		attributes: ['uid', 'firstname', 'lastname', 'email', 'lang']
	}).then(user => {
		if (user == null) {
			res.json({
				message: 'Error',
				error: {
					errorMessage: `No user with userID ${userID}`
				}
			});
		} else {
			res.status(200).json({
				message: `User with userID ${userID} was fetched`,
				user: user
			});
		}
	});
};

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

exports.users_change_language = (req, res, next) => {
	const userID = req.body.uid;
	User.update(
		{ lang: req.body.lang },
		{
			where: {
				uid: userID
			}
		}
	).then(user => {
		res.status(200).json({
			message: `Language for user with userID ${userID} was updated`,
			lang: req.body.lang
		});
	});
};

exports.users_delete_user = (req, res, next) => {
	const userID = req.params.userID;
	User.destroy({
		where: {
			uid: userID
		}
	}).then(
		res.status(200).json({
			message: `User with userID ${userID} was deleted`
		})
	);
};
