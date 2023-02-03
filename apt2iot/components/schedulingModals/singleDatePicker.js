import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

export default function SinglePicker() {
	const [date, setDate] = React.useState(undefined);
	const [open, setOpen] = React.useState(false);

	const onDismissSingle = React.useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirmSingle = React.useCallback(
		(params) => {
			setOpen(false);
			setDate(params.date);
			console.log(params.date);
		},
		[setOpen, setDate]
	);

	return (
		<View>
			<Button
				className='bg-slate-100  '
				onPress={() => setOpen(true)}
				uppercase={false}
				mode='elevated'>
				Single Date
			</Button>
			<DatePickerModal
				locale='en'
				mode='single'
				visible={open}
				onDismiss={onDismissSingle}
				date={date}
				onConfirm={onConfirmSingle}
			/>
		</View>
	);
}
