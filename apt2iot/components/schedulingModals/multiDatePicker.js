import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

export default function MultiPicker() {
	const [dates, setDates] = React.useState();
	const [open, setOpen] = React.useState(false);

	const onDismiss = React.useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirm = React.useCallback(
		(params) => {
			setOpen(false);
			setDates(params.dates);
			console.log(dates);
		},
		[dates]
	);

	React.useEffect(() => {
		if (dates) {
			console.log(dates);
		} else {
			console.log('no date selected');
		}
	}, [dates]);

	return (
		<View>
			<Button
				className='bg-slate-100'
				onPress={() => setOpen(true)}
				uppercase={false}
				mode='elevated'>
				Multiple
			</Button>
			<DatePickerModal
				locale='en'
				mode='multiple'
				visible={open}
				onDismiss={onDismiss}
				dates={dates}
				onConfirm={onConfirm}
			/>
		</View>
	);
}
