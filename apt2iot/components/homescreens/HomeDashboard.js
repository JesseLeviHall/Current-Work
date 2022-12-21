import React from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import holderImg from '../../images/placholders/home1.png';

//This is a placeholder because there is no functionality to implement.
//The image is unrelated to a gate openter, but there is no design yet for a gate opener, just trying to follow the design and legacy code even though it doesnt make sense.

const Home = () => {
	return (
		<View className=''>
			<Text className='w-screen text-3xl mt-4 ml-6 text-slate-700 font-thin'>
				Home Devices Are
			</Text>
			<Text className='w-screen text-3xl ml-6 mb-2 text-slate-700 font-bold'>
				Not Yet Connected
			</Text>
			<View className='flex-1 items-center justify-start'>
				<Image source={holderImg} className='w-screen h-full' />
			</View>
		</View>
	);
};

export default Home;
