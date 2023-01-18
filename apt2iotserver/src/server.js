const http = require('http');
const os = require('os');
const process = require('process');
const app = require('./app');

const { testConnection } = require('./services/mysql');

const PORT = process.env.PORT || 3500;

const server = http.createServer(app);

async function startServer() {
	try {
		await testConnection();
		const interfaces = os.networkInterfaces();
		let address;
		Object.keys(interfaces).forEach((interfaceName) => {
			const addresses = interfaces[interfaceName];
			for (let i = 0; i < addresses.length; i++) {
				const addr = addresses[i];
				if (addr.family === 'IPv4' && addr.internal === false) {
					address = addr.address;
					break;
				}
			}
		});
		server.listen(PORT, () => {
			console.log(`Server is running on IP ${address} and port ${PORT}`);
		});
	} catch (error) {
		console.error(error);
	}
}
startServer();
