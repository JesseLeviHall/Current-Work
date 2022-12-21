import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import FootBar from '../components/FootBar';

export default function PayBills() {
	const navigation = useNavigation();
	return (
		<View>
			<Text>PayBills</Text>
			<FootBar />
		</View>
	);
}
