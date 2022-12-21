import { View, Text, Image } from 'react-native';
import React from 'react';
import holderImg from '../../images/placholders/home1.png';

//This is a placeholder because there is no functionality to implement.

export default function SecurityCam() {
	return (
		<View>
			<Text className='w-screen text-3xl mt-4 ml-4 text-slate-700 font-thin'>
				The Security Camera
			</Text>
			<Text className=' w-64 text-3xl ml-4 text-slate-700 font-bold'>
				is not connected
			</Text>
			<View className='flex-1 items-center justify-start'>
				<Image source={holderImg} className='w-screen h-full' />
			</View>
		</View>
	);
}
