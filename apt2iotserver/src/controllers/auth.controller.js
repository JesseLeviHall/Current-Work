const User = require('../models/user.model');
const { sequelize } = require('../services/mysql');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const jwtConfig = require('../services/jwt.config');

const signUp = async (req, res) => {
	//TODO: send verification Email to new user
	//TODO: retype your password verication
	//grab data from body
	const { firstName, lastName, email, password } = req.body;
	//make sure password is string
	const plainpass = password?.toString();
	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(plainpass, salt);
	//check if email already exists
	const userExist = await User.findOne({
		where: {
			email: email,
		},
	});
	//create user if email is not already used
	try {
		if (!userExist) {
			User.sync();
			await User.create({
				firstName,
				lastName,
				email,
				password: hashedPassword,
			});
			User.sync();
			//get the new user
			const newUser = await User.findOne({
				where: { email: email },
			});
			//gen a session token
			const generateToken = (newUser) => {
				return JWT.sign({ id: newUser.id }, jwtConfig.secret, {
					expiresIn: jwtConfig.expiresIn,
					issuer: jwtConfig.issuer,
					audience: jwtConfig.audience,
					algorithm: jwtConfig.algorithm,
				});
			};
			//return user and login token
			res.status(200).json({
				id: newUser.id,
				name: newUser.firstName,
				email: newUser.email,
				role: newUser.role,
				token: generateToken(newUser),
			});
		} else {
			res.send({ message: 'Email already in use' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

const login = async (req, res) => {
	//grab data from body
	const { email, password } = req.body;
	//find a user with matching email
	const user = await User.findOne({
		where: { email: email },
	});
	//gen a session token
	try {
		const generateToken = (user) => {
			return JWT.sign({ id: user.id }, jwtConfig.secret, {
				expiresIn: jwtConfig.expiresIn,
				issuer: jwtConfig.issuer,
				audience: jwtConfig.audience,
				algorithm: jwtConfig.algorithm,
			});
		};
		//if user exists compare password and send token
		if (user && (await bcrypt.compare(password, user.password))) {
			res.status(200).json({
				id: user.id,
				name: user.firstName,
				email: user.email,
				role: user.role,
				token: generateToken(user),
			});
		} else {
			res.send({ message: 'invalid credentials' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

//a function to mess around with stuff
const sandBox = (req, res) => {
	res.send({ message: 'you made it past the protect middleware' });
};

module.exports = {
	sandBox,
	signUp,
	login,
};
