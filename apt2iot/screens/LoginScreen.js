import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
	Button,
	TextInput,
	ActivityIndicator,
	MD2Colors,
} from 'react-native-paper';
import {
	Platform,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Image,
	ImageBackground,
} from 'react-native';
import img from '../images/old/background.png';
import logo from '../images/old/logo_main.png';
import useAuth from '../hooks/useAuth';

//TODO: input validations + error handling

const LoginScreen = () => {
	const { email, password, setEmail, setPassword, handleLogin, loading } =
		useAuth();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});

	return (
		<>
			{!loading && (
				<ImageBackground className='flex-1' source={img}>
					<KeyboardAvoidingView behavior='position'>
						<Text className='mt-32 mb-5 text-center text-4xl'>
							Iot Smart Living
						</Text>
						<View />
						<Image
							className='grid-cols-1 self-center w-32 h-32  '
							source={logo}
							resizeMode='contain'
						/>
						<Text className='grid-cols-1 self-center text-lg mt-8'>
							Login with Email
						</Text>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-3'
							placeholder='Email'
							autoCapitalize='none'
							mode={'oulined'}
							value={email}
							onChangeText={setEmail}
						/>
						<TextInput
							className='grid-cols-1 self-center w-64 h-10 mt-3'
							placeholder='Password'
							autoCapitalize='none'
							mode={'oulined'}
							secureTextEntry={true}
							value={password}
							onChangeText={setPassword}
						/>
						<Button
							className={`grid-cols-1 self-center mt-6 w-64 `}
							mode={'contained-tonal'}
							textColor={'white'}
							buttonColor={'black'}
							onPress={() => handleLogin(email, password)}>
							Login
						</Button>
						<TouchableOpacity>
							<Text
								className='grid-cols-1 self-center text-lg mt-8 text-blue-400'
								onPress={() => navigation.navigate('SignUp')}>
								New? Create An Account
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

export default LoginScreen;
