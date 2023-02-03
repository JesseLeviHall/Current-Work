import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';

export default function EndTimePicker() {
	const [visible, setVisible] = React.useState(false);
	const onDismiss = React.useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	const onConfirm = React.useCallback(
		({ hours, minutes }) => {
			setVisible(false);
			console.log({ hours, minutes });
		},
		[setVisible]
	);

	return (
		<View>
			<Button
				className='bg-slate-100'
				onPress={() => setVisible(true)}
				uppercase={false}
				mode='elevated'>
				Pick End Time
			</Button>
			<TimePickerModal
				visible={visible}
				onDismiss={onDismiss}
				onConfirm={onConfirm}
				hours={12}
				minutes={14}
			/>
		</View>
	);
}
