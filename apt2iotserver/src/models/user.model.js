const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../services/mysql');

class User extends Model {
	otherPublicField;
}
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 20],
			},
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 20],
			},
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'user',
		},
		status: {
			type: DataTypes.ENUM('active', 'inactive'),
			defaultValue: 'active',
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
		tableName: 'Users',
		modelName: 'User',
		timestamps: false,
	}
);

module.exports = User;
