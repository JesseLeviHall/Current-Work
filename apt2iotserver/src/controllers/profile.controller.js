const express = require('express');
const Profile = require('../models/profile.model');
const { sequelize } = require('../services/mysql');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../services/jwt.config');
const path = require('path');
const fs = require('fs');

//get profile info
const getProfileInfo = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(token, jwtConfig.secret);
	const id = decoded.id; //is a number
	if (id) {
		try {
			const profile = await Profile.findByPk(id);
			res.status(200).json(profile);
		} catch (err) {
			res.status(500).json({ error: err.message });
			console.log({ error: err.message });
		}
	} else {
		res.status(400).json({ message: 'something went wrong' });
	}
};

//get profile photo
const getProfilePhoto = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(token, jwtConfig.secret);
	const id = decoded.id;
	if (id) {
		try {
			const [userProfile, created] = await Profile.findOrCreate({
				where: { userId: id },
				defaults: {
					photoUrl: 'blankphoto.PNG',
				},
			});
			const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
			const photoPath = path.join(uploadsDir, userProfile.photoUrl);
			res.status(200).sendFile(photoPath);
		} catch (err) {
			res.status(500).json({ error: err.message });
			console.log({ error: err.message });
		}
	} else {
		res.status(400).json({ message: 'user not found' });
	}
};

//update profile details
const updateProfileInfo = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(token, jwtConfig.secret);
	const id = decoded.id; //is a number
	const { address, city, state, zip, userName } = req.body;
	if (id) {
		try {
			// Find or create a profile with the given id
			const [userProfile, created] = await Profile.findOrCreate({
				where: { userId: id },
			});

			// Update only the fields that were sent
			if (address) userProfile.address = address;
			if (city) userProfile.city = city;
			if (state) userProfile.state = state;
			if (zip) userProfile.zip = zip;
			if (userName) userProfile.userName = userName;

			// Use the updated profile information to update the database
			await userProfile.save();

			// Return the updated profile
			res.status(200).json(userProfile);
		} catch (err) {
			res.status(500).json({ error: err.message });
			console.log({ error: err.message });
		}
	} else {
		res.status(400).json({ message: 'something went wrong' });
	}
};

//update profile photo
const updateProfilePhoto = async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(token, jwtConfig.secret);
	const id = decoded.id;
	const photo = req.file.filename;
	if (id) {
		try {
			// Find or create a profile with the given id
			const [userProfile, created] = await Profile.findOrCreate({
				where: { userId: id },
				defaults: {
					photoUrl: photo,
				},
			});

			// Update the photoUrl field
			if (photo) userProfile.photoUrl = photo;

			// Save the updated profile to the database
			await userProfile.save();

			res.status(200).json({ message: 'photo updated' });
		} catch (err) {
			res.status(500).json(err);
			console.log({ error: err.message });
		}
	} else {
		res.status(400).json({ message: 'No user found' });
	}
};

module.exports = {
	getProfileInfo,
	getProfilePhoto,
	updateProfileInfo,
	updateProfilePhoto,
};
