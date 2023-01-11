import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
	View,
	Text,
	ImageBackground,
	KeyboardAvoidingView,
} from 'react-native';
import { ActivityIndicator, MD2Colors, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import FootBar from '../components/FootBar';
import img from '../images/old/background2.png';

export default function MessageBoard() {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);

	//Appbar:
	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => (
				<Appbar.Header className='bg-zinc-100'>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title='Community Forum' />
				</Appbar.Header>
			),
		});
	}, [navigation]);

	return (
		<>
			{!loading && (
				<ImageBackground source={img} className='flex-1'>
					<KeyboardAvoidingView behavior='position'>
						<View className='flex flex-row justify-center mt-48'></View>
					</KeyboardAvoidingView>
					<View className='absolute inset-x-0 bottom-8 h-16'>
						<FootBar />
					</View>
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
}
