import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jdubDecode from 'jwt-decode';

// start the server and put the IP it is running on in here
const API = axios.create({
	baseURL: 'http://192.168.0.55:3500',
	timeout: 10000,
	withCredentials: false,
});

// Set Token to be in header in subsequent reqs after login or signup
API.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// check Logged in Token from Client - used on app initial load
export const getClientToken = async () => {
	try {
		const user = await AsyncStorage.getItem('token');
		const parsedUser = jdubDecode(user);
		if (parsedUser) {
			const expirationTime = new Date(parsedUser.exp * 1000);
			const currentTime = new Date();
			const valid = expirationTime <= currentTime ? false : true;
			if (valid) {
				return parsedUser;
			} else {
				return false;
			}
		}
	} catch (err) {
		console.log(err);
	}
};

// Get Logged in Token from Server used at login
export const getServerToken = async (userData) => {
	try {
		const { status, data } = await API.post('/api/login', userData);
		if (status === 200 && data.token) {
			AsyncStorage.setItem('token', `${data.token}`);
			AsyncStorage.setItem('userId', `${data.id}`);
			AsyncStorage.setItem('userEmail', data.email);
			AsyncStorage.setItem('firstName', data.name);
			AsyncStorage.setItem('role', data.role);
			return data;
		} else {
			return data.message;
		}
	} catch (error) {
		console.log(error);
	}
};

// Logout
export const logout = async () => {
	try {
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('userId');
		await AsyncStorage.removeItem('userEmail');
		await AsyncStorage.removeItem('firstName');
		await AsyncStorage.removeItem('role');
	} catch (error) {
		console.log(error);
	}
};

// sign up function also logs you in
export const signUp = async (signupData) => {
	try {
		const { status, data } = await API.post('/api/signup', signupData);
		if (status === 200 && data.token) {
			AsyncStorage.setItem('token', `${data.token}`);
			AsyncStorage.setItem('userId', `${data.id}`);
			AsyncStorage.setItem('userEmail', data.email);
			AsyncStorage.setItem('firstName', data.name);
			AsyncStorage.setItem('role', data.role);
			return data;
		} else {
			return data.message;
		}
	} catch (error) {
		console.log(error);
	}
};

// get profile info
export const getProfileInfo = async () => {
	try {
		const { status, data } = await API.get('/api/profiledata');
		if (status === 200) {
			return data;
		} else {
			console.log(`Error getting info: ${status}`);
			return null;
		}
	} catch (error) {}
	console.log(error.message);
	return;
};

//update profile info
export const updateProfileInfo = async (updateData) => {
	try {
		const { status, data } = await API.put('/api/profile', updateData);
		if (status === 200) {
			return data;
		} else {
			console.log(`Error: ${status}`);
			return null;
		}
	} catch (error) {
		console.log(error.message);
		return;
	}
};

//get profile photo
export const getProfilePhoto = async () => {
	try {
		const { status, data } = await API.get('/api/profilephoto', {
			responseType: 'blob',
		});
		if (status === 200) {
			return data;
		} else {
			console.log(`Error getting photo: ${status}`);
			return null;
		}
	} catch (error) {
		console.log('OH NO, NO PHOTO', error.message);
	}
};

//upload profile photo
export const uploadProfilePhoto = async (photoData) => {
	try {
		const { status, data } = await API.post('/api/profile/photo', photoData);
		if (status === 200) {
			return data.message;
		} else {
			console.log(`Error uploading photo: ${status}`);
			return null;
		}
	} catch (error) {
		console.log('Error sending blob or something', error.message);
	}
};
