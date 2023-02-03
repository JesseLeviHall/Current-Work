import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import { HomeScreenProvider } from './hooks/useHomeComponent';
import { en, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en', en);

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<HomeScreenProvider>
					<StackNavigator />
				</HomeScreenProvider>
			</AuthProvider>
		</NavigationContainer>
	);
}
