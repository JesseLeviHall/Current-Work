import React, { useLayoutEffect } from 'react';
import bg from '../images/old/background2.png';
import { useNavigation } from '@react-navigation/core';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import MenuTabs from '../components/MenuTabs';
import HeaderComponent from '../components/HeaderComponent';
import FootBar from '../components/FootBar';
import {
	Home,
	Thermostat,
	ComplexAccess,
	SecurityCam,
	Lighting,
	Appliances,
	DoorLock,
} from '../components/homescreens/comonent_index';
import { useHomeComponent } from '../hooks/useHomeComponent';

//TODO: turn view containing home components to scrollview,then code layout and design of each respective component.
const HomeScreen = () => {
	const { component } = useHomeComponent();
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});

	return (
		<>
			<ImageBackground className='flex-1' source={bg}>
				<HeaderComponent />
				<MenuTabs />
				<View className='flex-1 items-center justify-center'>
					<View>
						{component === 'Home' && <Home />}
						{component === 'ComplexAccess' && <ComplexAccess />}
						{component === 'DoorLock' && <DoorLock />}
						{component === 'Thermostat' && <Thermostat />}
						{component === 'Lighting' && <Lighting />}
						{component === 'SecurityCam' && <SecurityCam />}
						{component === 'Appliances' && <Appliances />}
					</View>
				</View>
				<FootBar />
			</ImageBackground>
		</>
	);
};

export default HomeScreen;
