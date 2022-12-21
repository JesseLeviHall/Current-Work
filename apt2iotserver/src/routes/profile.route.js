const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const {
	getProfileInfo,
	getProfilePhoto,
	updateProfileInfo,
	updateProfilePhoto,
} = require('../controllers/profile.controller');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 1000000000,
		fieldNameSize: 100000000,
		fields: 10000000000,
		files: 100000000,
		parts: 1000000000,
	},
});

const profileRouter = express.Router();

profileRouter.get('/profiledata', protect, getProfileInfo);
profileRouter.get('/profilephoto', protect, getProfilePhoto);
profileRouter.put('/profile', protect, updateProfileInfo);
profileRouter.post(
	'/profile/photo',
	protect,
	upload.single('photo'),
	updateProfilePhoto
);

module.exports = profileRouter;
