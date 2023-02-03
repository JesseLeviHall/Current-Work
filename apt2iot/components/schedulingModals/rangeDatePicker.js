import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RangePicker() {
	const [range, setRange] = React.useState({
		startDate: undefined,
		endDate: undefined,
	});
	const [open, setOpen] = React.useState(false);

	const onDismiss = React.useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirm = React.useCallback(
		({ startDate, endDate }) => {
			setOpen(false);
			setRange({ startDate, endDate });
		},
		[setOpen, setRange]
	);

	return (
		<View className=''>
			<Button onPress={() => setOpen(true)} uppercase={false} mode='outlined'>
				Pick Date Range
			</Button>
			<DatePickerModal
				locale='en'
				mode='range'
				visible={open}
				onDismiss={onDismiss}
				startDate={range.startDate}
				endDate={range.endDate}
				onConfirm={onConfirm}
			/>
		</View>
	);
}
