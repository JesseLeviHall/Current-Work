import React from 'react';
import { View, FlatList } from 'react-native';
import TabItem from './TabItem';

//this component creates the flatlist for the horizontal scroll header on homescreen

const MenuTabs = () => {
	return (
		<View className='flex overflow-auto touch-pan-x snap-x snap-mandatory mt-2 h-auto w-full bg-transparent'>
			<FlatList
				showsHorizontalScrollIndicator={false}
				horizontal
				data={TABDATA}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TabItem text={item.title} toScreen={item.toScreen} />
				)}
			/>
		</View>
	);
};

export default MenuTabs;

const TABDATA = [
	{
		id: 1,
		title: 'Dashboard',
		toScreen: 'Home',
	},
	{
		id: 2,
		title: 'Complex Access',
		toScreen: 'ComplexAccess',
	},
	{
		id: 3,
		title: 'Door Lock',
		toScreen: 'DoorLock',
	},

	{
		id: 4,
		title: 'Lighting',
		toScreen: 'Lighting',
	},
	{
		id: 5,
		title: 'Thermostat',
		toScreen: 'Thermostat',
	},
	{
		id: 6,
		title: 'Appliance',
		toScreen: 'Appliances',
	},
	{
		id: 7,
		title: 'Security Cam',
		toScreen: 'SecurityCam',
	},
];
