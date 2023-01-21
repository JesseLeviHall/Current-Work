const API = axios.create({
	baseURL: 'http://192.168.0.55:3500',
	timeout: 5000,
	responseType: 'json',
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
	},
});
