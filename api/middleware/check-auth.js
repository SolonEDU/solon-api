require('dotenv').config();

module.exports = (req, res, next) => {
	if (req.headers.authorization == process.env.AUTHORIZATION) {
		next();
	} else {
		return res.status(401).json({
			message: 'Auth failed'
		});
	}
};
