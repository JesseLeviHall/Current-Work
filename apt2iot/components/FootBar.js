import { View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Icon } from '@rneui/base';
import plusPic from '../images/old/add_pick.png';

//this component shows the icons (the ones that do nothing) on the bottom of the home screen

export default function FootBar() {
	const navigation = useNavigation();
	return (
		<View className='bg-slate-400 fixed h-24 flex flex-row justify-between'>
			<View className='flex items-center mt-2'>
				<Icon
					onPress={() => navigation.navigate('Home')}
					name='home'
					color='black'
					size={64}
					type='fontawesome'
				/>
			</View>
			<View className='flex items-center mt-4 '>
				<Icon name='heart' color='black' size={48} type='feather' />
			</View>
			<View className='flex items-center mt-4 '>
				<Image
					className='h-12 w-14 rounded-2xl border-2 border-black'
					source={plusPic}
				/>
			</View>
			<View className='flex items-center mt-4 '>
				<Icon name='user' color='black' size={48} type='feather' />
			</View>
			<View className='flex items-center mt-4 mr-2'>
				<Icon
					onPress={() => navigation.navigate('SetAutomations')}
					name='clock'
					color='black'
					size={48}
					type='feather'
				/>
			</View>
		</View>
	);
}
