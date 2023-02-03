import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { ActivityIndicator, MD2Colors, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import FootBar from '../components/FootBar';
import SinglePicker from '../components/schedulingModals/singleDatePicker';
import RangePicker from '../components/schedulingModals/rangeDatePicker';
import TimePicker from '../components/schedulingModals/timePicker';
import img from '../images/old/background2.png';

export default function SetAutomations() {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);

	//Appbar:
	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => (
				<Appbar.Header className='bg-zinc-100'>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title='Set Automations' />
				</Appbar.Header>
			),
		});
	}, [navigation]);

	return (
		<>
			{!loading && (
				<ImageBackground source={img} className='flex-1'>
					<Text className='w-screen text-4xl text-center mt-8 text-slate-700 font-bold'>
						Set Scheduled Automations
					</Text>
					<Text className='w-screen text-3xl mt-4 text-center text-slate-700 font-thin'>
						Select a date range and time to set the automation
					</Text>
					<View className='grid grid-cols-3 mt-4 '>
						<RangePicker />
						<SinglePicker />
						<TimePicker />
					</View>
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
