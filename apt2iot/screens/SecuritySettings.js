import { View, Text } from 'react-native';
import React from 'react';
import LogOutButton from '../components/LogOutButton';

export default function SecuritySettings() {
	return (
		<View>
			<Text>
				SecuritySettings
				<LogOutButton />
			</Text>
		</View>
	);
}
