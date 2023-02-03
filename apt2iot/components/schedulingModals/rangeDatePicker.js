import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

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
			console.log({ startDate, endDate });
		},
		[setOpen, setRange]
	);

	return (
		<View>
			<Button
				className='bg-slate-100'
				onPress={() => setOpen(true)}
				mode='elevated'>
				Range
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
