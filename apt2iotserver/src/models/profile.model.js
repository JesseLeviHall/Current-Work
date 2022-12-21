const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../services/mysql');

const Profile = sequelize.define(
	'Profile',
	{
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: 'Users',
				key: 'id',
			},
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [0, 20],
			},
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [0, 50],
			},
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [0, 30],
			},
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [0, 30],
			},
		},
		zip: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [0, 10],
			},
		},
		livingType: {
			type: DataTypes.ENUM('resident', 'owner'),
			defaultValue: 'resident',
		},
		photoUrl: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: 'blankphoto.PNG',
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		},
	},
	{
		sequelize,
		tableName: 'Profiles',
		modelName: 'Profile',
		timestamps: false,
	}
);

sequelize.sync();

module.exports = Profile;
