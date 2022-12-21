const Sequelize = require('sequelize');

require('dotenv').config();

//MySQL password locally could just be 'root'
const dbpass = process.env.MYSQL_PASS;

// connect to database by passing DB name and MySQL user credentials
const sequelize = new Sequelize('Apt2IoT', 'root', `${dbpass}`, {
	dialect: 'mysql',
	host: 'localhost',
});

// test connection
async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

// export connection
module.exports = { sequelize, testConnection };
