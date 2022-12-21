import { View } from 'react-native';
import { Button } from '@rneui/base';
import React from 'react';
import useAuth from '../hooks/useAuth';

export default function LogOutButton() {
	const { logout } = useAuth();
	return (
		<View>
			<Button color='black' mode='contained' title='logout' onPress={logout}>
				Logout
			</Button>
		</View>
	);
}
