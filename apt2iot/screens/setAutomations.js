import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import StartTimePicker from '../components/schedulingModals/startTimePicker';
import EndTimePicker from '../components/schedulingModals/endTimePicker';
import MultiPicker from '../components/schedulingModals/multiDatePicker';
import img from '../images/old/background2.png';

export default function SetAutomations() {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);

	//confirm dialog:
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

	//dialog styles:
	const containerStyle = {
		backgroundColor: 'white',
		position: 'absolute',
		width: '100%',
		height: '95%',
		top: -450,
		left: 10,
		padding: 20,
		margin: 20,
		borderRadius: 10,
	};

	return (
		<>
			{!loading && (
				<ImageBackground source={img} className='flex-1 -z-20'>
					<ScrollView>
						<Text className='w-screen text-4xl text-center mt-8 text-slate-700 font-bold'>
							Schedule Automated Modes
						</Text>
						<Text className='w-screen text-3xl mt-4 text-center text-black font-thin'>
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
						<Text className='w-screen text-3xl mt-6 text-center text-black font-thin'>
							Set Start Time:
						</Text>
						<View className='px-16 mt-4'>
							<StartTimePicker />
						</View>
						<Text className='w-screen text-3xl mt-6 text-center text-black font-thin'>
							Set End Time:
						</Text>
						<View className='px-16 mt-4'>
							<EndTimePicker />
						</View>
						<Text className='w-screen text-3xl mt-6 text-center text-black font-thin'>
							Select Life-Style Mode:
						</Text>
						<View className='grid grid-cols-1 gap-4 mt-4 mx-auto justify-center '>
							<TouchableOpacity>
								<View className='bg-slate-100 h-10 w-64 rounded-full border mr-2 justify-center'>
									<Text className='text-center'>At Home</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity>
								<View className='bg-slate-100 h-10 w-64 rounded-full border mr-2 justify-center'>
									<Text className='text-center'>Sleep Mode</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity>
								<View className='bg-slate-100 h-10 w-64 rounded-full border mr-2 justify-center'>
									<Text className='text-center'>Away</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity>
								<View className='bg-slate-100 h-10 w-64 rounded-full border mr-2 justify-center'>
									<Text className='text-center'>Vacation Mode</Text>
								</View>
							</TouchableOpacity>
						</View>
						<Provider>
							<View className='px-16'>
								<Button
									onPress={showDialog}
									className='bg-slate-400 text-white z-10  mt-14 mb-48 '
									mode='elevated'>
									Save Automation
								</Button>
								<Portal contentContainerStyle={containerStyle}>
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
