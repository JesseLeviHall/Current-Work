import { View, Text, Image } from 'react-native';
import React from 'react';
import holderImg from '../../images/placholders/appliances.png';

//This is a placeholder because there is no functionality to implement.

export default function Appliances() {
	return (
		<View className='mt-3 flex-1 justify-center align-center'>
			<Image source={holderImg} className='w-screen h-full' />
		</View>
	);
}
