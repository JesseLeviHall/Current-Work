import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
	Button,
	TextInput,
	ActivityIndicator,
	MD2Colors,
} from 'react-native-paper';
import {
	View,
	ImageBackground,
	Image,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import * as api from '../api/index';

//TODO: input validations

const SignupScreen = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();
	const { loading, setLoading, setError, setIsAuthorized } = useAuth();

	const handleSignup = async () => {
		setLoading(true);
		const signupData = { firstName, lastName, email, password };
		try {
			const response = await api.signUp(signupData);
			if (response.token) {
				setIsAuthorized(true);
				setLoading(false);
				console.log('sign up successful');
			} else {
				setLoading(false);
				setIsAuthorized(false);
				setError(response);
				console.log(error);
			}
		} catch (error) {
			setLoading(false);
			setIsAuthorized(false);
			setError(error);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});

	return (
		<>
			{!loading && (
				<ImageBackground
					className='flex-1'
					source={require('../images/old/background.png')}>
					<KeyboardAvoidingView behavior='position'>
						<Text className='mt-32 mb-5 text-center text-4xl'>
							Iot Smart Living
						</Text>
						<View />
						<Image
							className='grid-cols-1 self-center w-32 h-32  '
							source={require('../images/old/logo_main.png')}
							resizeMode='contain'
						/>
						<Text className='grid-cols-1 self-center text-lg mt-8'>
							Create New Account
						</Text>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-2'
							placeholder='First Name'
							mode='outlined'
							value={firstName}
							onChangeText={(text) => setFirstName(text)}
						/>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-2'
							placeholder='Last Name'
							mode='outlined'
							value={lastName}
							onChangeText={(text) => setLastName(text)}
						/>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-2'
							placeholder='Email'
							autoCapitalize='none'
							mode='outlined'
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-2'
							passwordRules={true}
							placeholder='Create Password'
							autoCapitalize='none'
							password={true}
							mode='outlined'
							textContentType='newPassword'
							secureTextEntry={true}
							value={password}
							onChangeText={(text) => {
								setPassword(text);
							}}
						/>
						<Button
							className='grid-cols-1 self-center w-64 h-10 mt-5 bg-stone-900'
							mode='contained'
							onPress={() => handleSignup()}>
							signup
						</Button>
						<TouchableOpacity>
							<Text
								className='grid-cols-1 self-center text-lg mt-8 text-blue-400'
								onPress={() => navigation.navigate('Login')}>
								Already have an account?
							</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</ImageBackground>
			)}
			{loading && (
				<ActivityIndicator animating={true} color={MD2Colors.red800} />
			)}
		</>
	);
};

export default SignupScreen;
