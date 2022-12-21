import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon, Overlay } from '@rneui/base';
import HeaderItem from './HeaderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

//this component defines the icons at the top of the home screen and the menu overlays that they open

export default function HeaderComponent() {
	const [visible, setVisible] = useState(false);
	const [visibleTwo, setVisibleTwo] = useState(false);
	const [currentName, setCurrentName] = useState('');
	const toggleOverlay = () => {
		setVisible(!visible);
	};
	const toggleOverlayTwo = () => {
		setVisibleTwo(!visibleTwo);
	};

	const user = async () => {
		try {
			const firstName = await AsyncStorage.getItem('firstName');
			if (firstName) {
				setCurrentName(firstName);
			} else {
				setCurrentName('User');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		user();
	}, []);

	return (
		<View className='flex flex-row mx-8 justify-between h-14 mt-16 bg-transparent'>
			<Overlay
				isVisible={visible}
				onBackdropPress={toggleOverlay}
				fullScreen={false}
				overlayStyle={{
					backgroundColor: 'rgba(0,0,0,1)',
					borderRadius: 17,
					width: '50%',
					height: '42%',
					position: 'absolute',
					top: 100,
					left: 40,
					right: 0,
					bottom: 0,
					zIndex: 999,
				}}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={leftData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<HeaderItem
							onPressOut={toggleOverlay}
							text={item.title}
							toScreen={item.toScreen}
						/>
					)}
				/>
			</Overlay>
			<Overlay
				isVisible={visibleTwo}
				onBackdropPress={toggleOverlayTwo}
				onPress={toggleOverlayTwo}
				fullScreen={false}
				overlayStyle={{
					backgroundColor: 'rgba(0,0,0,1)',
					borderRadius: 17,
					width: '50%',
					height: '45%',
					position: 'absolute',
					top: 100,
					left: 150,
					right: 0,
					bottom: 0,
					zIndex: 999,
				}}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={rightData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<HeaderItem
							onPressOut={toggleOverlayTwo}
							text={item.title}
							toScreen={item.toScreen}
						/>
					)}
				/>
			</Overlay>

			<Icon
				name='align-left'
				color='black'
				size={36}
				type='foundation'
				onPress={toggleOverlay}
			/>
			<Text className='text-lg ml-16 mt-1 text-slate-900 font-thin'>
				Hello,
			</Text>
			<Text className='text-lg mr-16 mt-1 text-slate-700 font-bold'>
				{currentName}
			</Text>
			<Icon
				name='team'
				color='black'
				size={36}
				type='antdesign'
				onPress={toggleOverlayTwo}
			/>
		</View>
	);
}

const leftData = [
	{
		id: 1,
		title: 'Edit Profile',
		toScreen: 'ProfileUpdate',
	},
	{
		id: 2,
		title: 'Account Settings',
		toScreen: 'SecuritySettings',
	},
	{
		id: 3,
		title: 'Contact Support',
		toScreen: 'ContactSupport',
	},
	{
		id: 4,
		title: 'Share Access',
		toScreen: 'ShareAccess',
	},
];

const rightData = [
	{
		id: 1,
		title: 'Maintenance Request',
		toScreen: 'MaintReq',
	},
	{
		id: 2,
		title: 'Delivery Info',
		toScreen: 'DeliveryInfo',
	},
	{
		id: 3,
		title: 'Pay Bills',
		toScreen: 'PayBills',
	},
	{
		id: 4,
		title: 'Residence Activity',
		toScreen: 'MessageBoard',
	},
];
