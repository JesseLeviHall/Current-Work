import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useHomeComponent } from '../hooks/useHomeComponent';

//This component defines the indivual item in the horizontal scroll header flatlist on the home screen, and sets the conext state for which component is shown, the conditional color gives yellow backgroune for whichever tab is set to the state.

const TabItem = ({ text, toScreen }) => {
	const { component, setComponent } = useHomeComponent();
	return (
		<View className='snap-always snap-center'>
			<TouchableOpacity onPress={() => setComponent(toScreen)}>
				<View
					className={`flex-shrink-0 h-10 w-18 mx-1 rounded-full  ${
						component === toScreen
							? `bg-yellow-500 border border-stone-500`
							: `bg-transparent`
					} `}>
					<Text className='text-center h-auto w-auto mt-1 px-4 text-xl font-medium'>
						{text}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default TabItem;
