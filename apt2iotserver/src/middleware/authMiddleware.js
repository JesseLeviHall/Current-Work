const jwt = require('jsonwebtoken');
const jwtConfig = require('../services/jwt.config');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
	let token;
	// Check for token in the headers for authorization and Bearer token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Get the token from the header
			// comes back as "Bearer token" must split at space
			// split will give this [Bearer token] and need the second idx
			token = req.headers.authorization.split(' ')[1];
			// Verify the token value
			const decoded = jwt.verify(token, jwtConfig.secret);
			req.user = await User.findByPk(decoded.id);
			next();
		} catch (err) {
			console.error(err);
			res.status(401).send({ message: 'Not authorized, token failed' });
		}
	}
	if (!token) {
		res.status(401).send({ message: 'Not authorized, missing token' });
	}
};

module.exports = { protect };
