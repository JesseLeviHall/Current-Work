import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/core';

//This component defines the item in the overlay menu in the header component

export default function HeaderItem({ text, toScreen, onPressOut }) {
	const navigation = useNavigation();

	return (
		<TouchableHighlight>
			<View className='px-2 py-2 mt-2'>
				<Text
					onPress={() => navigation.navigate(toScreen)}
					onPressOut={onPressOut}
					className='text-xl pb-2 text-white'>
					{text}
				</Text>
				<Text className='text-white'>____________________</Text>
			</View>
		</TouchableHighlight>
	);
}
