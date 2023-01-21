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
starting new ec2:
sudo yum update -y
sudo yum install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
restart connection
docker login, enter username and password
docker run -it -p 3500:3500 apt2iot/backend<version>
*/
