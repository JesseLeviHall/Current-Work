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
	Alert,
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
			} else {
				setLoading(false);
				setIsAuthorized(false);
				Alert.alert(response);
			}
		} catch (error) {
			setLoading(false);
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
							mode={'oulined'}
							value={firstName}
							onChangeText={(text) => setFirstName(text)}
						/>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-2'
							placeholder='Last Name'
							mode={'oulined'}
							value={lastName}
							onChangeText={(text) => setLastName(text)}
						/>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-2'
							placeholder='Email'
							autoCapitalize='none'
							mode={'oulined'}
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-2'
							passwordRules={true}
							placeholder='Create Password'
							autoCapitalize='none'
							password={true}
							mode={'oulined'}
							textContentType='newPassword'
							secureTextEntry={true}
							value={password}
							onChangeText={(text) => {
								setPassword(text);
							}}
						/>
						<Button
							className={`grid-cols-1 self-center mt-6 w-64 `}
							mode={'contained-tonal'}
							textColor={'white'}
							buttonColor={'black'}
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
				<ActivityIndicator
					className='flex-1 justify-center items-center'
					size={'large'}
					animating={true}
					color={MD2Colors.red800}
				/>
			)}
		</>
	);
};

export default SignupScreen;
