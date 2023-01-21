const API = axios.create({
	baseURL: 'http://192.168.0.55:3500',
	timeout: 5000,
	responseType: 'json',
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
	},
});
/* 
HTTPS: configure cloudfront on aws or,
to create a new self signed ssl:
openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
try chmod 400 server.key.pem

aws instance connect ingress ip:
18.206.107.24/29

docker build . -t apt2iot/backend<version>
docker run -it -p 3500:3500 apt2iot/backend<version>
    //only for testing build - DB will not connect
docker push apt2iot/backend<version>


starting new ec2:
sudo yum update -y
sudo yum install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
restart connection
docker login, enter username and password
docker run -it -p 3500:3500 apt2iot/backend<version>
*/
