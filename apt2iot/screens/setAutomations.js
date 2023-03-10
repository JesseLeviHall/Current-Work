import React, { useState, useReducer, useEffect, useLayoutEffect } from 'react';
import {
	View,
	Text,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import {
	ActivityIndicator,
	MD2Colors,
	Appbar,
	Button,
	Dialog,
	Portal,
	Provider,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import FootBar from '../components/FootBar';
import SinglePicker from '../components/schedulingModals/singleDatePicker';
import RangePicker from '../components/schedulingModals/rangeDatePicker';
import StartTimePicker from '../components/schedulingModals/startTimePick';
import EndTimePicker from '../components/schedulingModals/endTimePick';
import MultiPicker from '../components/schedulingModals/multiDatePicker';
import img from '../images/old/background2.png';

//to set selected automation, we're using the reducer hook for the various modes rather than a bunch of useState hooks.
const initialState = {
	mode: 'At Home',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'At Home':
			return { mode: 'At Home' };
		case 'Away':
			return { mode: 'Away' };
		case 'Sleep Mode':
			return { mode: 'Sleep Mode' };
		case 'Vacation Mode':
			return { mode: 'Vacation Mode' };
		default:
			return state;
	}
};

export default function SetAutomations() {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);

	//confirmation dialog:
	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);

	//Appbar:
	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => (
				<Appbar.Header className='bg-zinc-100'>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title='Automations' />
				</Appbar.Header>
			),
		});
	}, [navigation]);

	return (
		<>
			{!loading && (
				<ImageBackground source={img} className='flex-1 -z-20'>
					<ScrollView>
						<Text className='w-screen text-4xl text-center mt-8 text-slate-700 font-bold'>
							Schedule Automated Modes
						</Text>
						<Text className='w-screen text-3xl mt-4 text-center text-black  font-light'>
							Set Date or Date Range:
						</Text>
						<View className='flex flex-row mt-4 justify-center mx-4 '>
							<View className='basis-auto px-1'>
								<RangePicker />
							</View>
							<View className='basis-auto px-1 '>
								<SinglePicker />
							</View>
							<View className='basis-auto px-1'>
								<MultiPicker />
							</View>
						</View>
						<Text className='w-screen text-3xl mt-6 text-center text-black  font-light'>
							Set Start Time:
						</Text>
						<View className='px-16 mt-4'>
							<StartTimePicker />
						</View>
						<Text className='w-screen text-3xl mt-6 text-center text-black  font-light '>
							Set End Time:
						</Text>
						<View className='px-16 mt-4'>
							<EndTimePicker />
						</View>
						<Text className='w-screen text-3xl mt-6 text-center text-black font-light'>
							Select Life-Style Mode:
						</Text>
						<Text className=' mx-5 text-xl mt-1 text-center text-black font-thin '>
							Set the mode you want to be active during the selected time
						</Text>
						<View className='grid grid-cols-1 gap-4 mt-3 mx-auto justify-center '>
							<TouchableOpacity onPress={() => dispatch({ type: 'At Home' })}>
								<View
									className={`h-10 w-64 rounded-full border mr-2 justify-center ${
										state.mode === 'At Home' ? 'bg-yellow-300' : 'bg-slate-100'
									}`}>
									<Text className='text-center'>At Home</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => dispatch({ type: 'Sleep Mode' })}>
								<View
									className={`h-10 w-64 rounded-full border mr-2 justify-center ${
										state.mode === 'Sleep Mode'
											? 'bg-yellow-300'
											: 'bg-slate-100'
									}`}>
									<Text className='text-center'>Sleep Mode</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => dispatch({ type: 'Away' })}>
								<View
									className={`h-10 w-64 rounded-full border mr-2 justify-center ${
										state.mode === 'Away' ? 'bg-yellow-300' : 'bg-slate-100'
									}`}>
									<Text className='text-center'>Away</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => dispatch({ type: 'Vacation Mode' })}>
								<View
									className={`h-10 w-64 rounded-full border mr-2 justify-center ${
										state.mode === 'Vacation Mode'
											? 'bg-yellow-300'
											: 'bg-slate-100'
									}`}>
									<Text className='text-center'>Vacation Mode</Text>
								</View>
							</TouchableOpacity>
						</View>
						<Text className='w-screen text-3xl mt-16 text-center text-black '>
							All Good?
						</Text>
						<Provider>
							<View className='px-16 mt-4 mb-96'>
								<Button
									onPress={showDialog}
									className=' bg-fuchsia-100  text-white '
									mode='elevated'>
									Save Automation
								</Button>
								<Portal>
									<Dialog visible={visible} onDismiss={hideDialog}>
										<Dialog.Title>Success</Dialog.Title>
										<Dialog.Content>
											<Text variant='bodyLarge'>Automation Set!</Text>
										</Dialog.Content>
										<Dialog.Actions>
											<Button onPress={hideDialog}>Done</Button>
										</Dialog.Actions>
									</Dialog>
								</Portal>
							</View>
						</Provider>
					</ScrollView>
					<View className='z-100 absolute inset-x-0 bottom-8 h-16'>
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
