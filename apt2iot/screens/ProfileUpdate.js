import React, { useState, useEffect, useLayoutEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Appbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {
	Button,
	TextInput,
	Modal,
	Portal,
	Provider,
	Divider,
	ActivityIndicator,
	MD2Colors,
} from 'react-native-paper';
import {
	View,
	Text,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
} from 'react-native';
import img from '../images/old/background2.png';
import stock from '../images/placholders/blankphoto.jpeg';
import FootBar from '../components/FootBar';
import { useNavigation } from '@react-navigation/core';
import * as api from '../api/index';

export default function ProfileUpdate() {
	const [visible, setVisible] = useState(false);
	const navigation = useNavigation();
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [userName, setUserName] = useState('');
	const [photoBlob, setPhotoBlob] = useState(null);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	//get profile info
	const getProfileInfo = async () => {
		try {
			setLoading(true);
			const response = await api.getProfileInfo();
			if (response) {
				setAddress(response.address);
				setCity(response.city);
				setState(response.state);
				setZip(response.zip);
				setUserName(response.userName);
			} else {
				setLoading(false);
				return;
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	//get profile photo
	const getPhoto = async () => {
		try {
			setLoading(true);
			setPhotoBlob(false);
			const data = await api.getProfilePhoto();
			if (data) {
				setLoading(false);
				const photoData = URL.createObjectURL(data);
				setPhotoBlob(photoData);
			} else {
				setLoading(false);
				return;
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	//send photo upload
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		if (!result.canceled) {
			try {
				setLoading(true);
				const file = {
					uri: result.assets[0].uri,
					type: result.assets[0].type,
					name: result.assets[0].fileName,
				};
				const photoData = new FormData();
				photoData.append('photo', file);
				await api.uploadProfilePhoto(photoData);
				getPhoto();
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
	};

	//send form data
	const handleUpdate = async () => {
		setLoading(true);
		const updateData = { address, city, state, zip, userName };
		try {
			const response = await api.updateProfileInfo(updateData);
			if (response) {
				setLoading(false);
				hideModal();
				getPhoto();
			} else {
				setLoading(false);
				console.log(error);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	//state selector
	const toggleDropDown = () => {
		setOpen(!open);
	};

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	//modal styles:
	const containerStyle = {
		backgroundColor: 'white',
		position: 'absolute',
		top: -350,
		left: 45,
		right: 0,
		height: 400,
		width: 300,
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			header: () => (
				<Appbar.Header className='bg-zinc-100'>
					<Appbar.BackAction onPress={() => navigation.goBack()} />
					<Appbar.Content title='Update Profile' />
				</Appbar.Header>
			),
		});
	}, [navigation]);

	//get profile info
	useEffect(() => {
		getProfileInfo();
		getPhoto();
	}, []);

	return (
		<>
			{!loading && (
				<ImageBackground source={img} className='flex-1'>
					<KeyboardAvoidingView behavior='position'>
						<View className='grid-cols-1 self-center w-screen h-18 mt-18'>
							<View className='mt-8'>
								{photoBlob ? (
									<Image
										className='grid-cols-1 self-center'
										source={{ uri: photoBlob }}
										style={{
											width: 100,
											height: 100,
											borderRadius: 50,
											marginTop: 10,
										}}
									/>
								) : (
									<Image
										className='grid-cols-1 self-center'
										source={stock}
										style={{
											width: 100,
											height: 100,
											borderRadius: 50,
											marginTop: 10,
										}}
									/>
								)}
								<Button onPress={pickImage} icon='camera'>
									choose photo
								</Button>
							</View>
							<Text className='mt-12 mb-2 text-center text-xl text-bold'>
								Personal Details
							</Text>
							<Divider
								horizontalInset={5}
								style={{ backgroundColor: 'black' }}
								bold={true}
							/>
							<View className='grid-cols-1 self-center mt-10'>
								<View className='flex-row'>
									<Text className='text-bold underline text-lg '>
										Username:{' '}
									</Text>
									<Text className='text-bold text-lg ml-4'>
										{userName || 'Choose a Username'}
									</Text>
								</View>
								<View className='flex-row mt-4'>
									<Text className='text-bold underline text-lg'>Address: </Text>
									<Text className='text-bold text-lg ml-8'>
										{address || 'Where you use this App'}
									</Text>
								</View>
								<View className='flex-col'>
									<Text className='text-bold text-lg text-left mt-2 ml-28'>
										{city}
									</Text>
									<Text className='text-bold text-lg text-left mt-2 ml-28'>
										{state}
									</Text>
									<Text className='text-bold text-lg text-left mt-2 ml-28'>
										{zip}
									</Text>
								</View>
							</View>
							<Provider>
								<Portal>
									<Modal
										visible={visible}
										dismissable={true}
										onDismiss={() => setVisible(false)}
										contentContainerStyle={containerStyle}>
										<Button
											className='self-end mt-2 mr-2'
											onPress={hideModal}
											icon='close'>
											cancel
										</Button>
										<KeyboardAvoidingView>
											<TextInput
												className='grid-cols-1 self-center w-64 h-10 mt-2'
												placeholder='Choose A Username (optional)'
												autoCapitalize='none'
												mode='outlined'
												value={userName}
												onChangeText={(text) => setUserName(text)}
											/>
											<TextInput
												className='grid-cols-1 self-center w-64 h-10 mt-2'
												placeholder='Street Address'
												mode='outlined'
												value={address}
												onChangeText={(text) => setAddress(text)}
											/>
											<TextInput
												className='grid-cols-1 self-center w-64 h-10 mt-2'
												placeholder='City'
												mode='outlined'
												value={city}
												onChangeText={(text) => setCity(text)}
											/>
											<TextInput
												className='grid-cols-1 self-center w-64 h-10 mt-2'
												placeholder='Zip'
												autoCapitalize='none'
												mode='outlined'
												value={zip}
												onChangeText={(text) => setZip(text)}
											/>
											<DropDownPicker
												className='grid-cols-1 self-center w-64 h-10 my-4'
												activityIndicatorColor='#5188E3'
												items={data}
												defaultValue={'state'}
												setOpen={setOpen}
												open={open}
												dropDownContainerStyle={{
													position: 'absolute',
													top: -200,
													left: 45,
													height: 400,
													width: 200,
												}}
												setValue={setState}
												dropDownDirection='TOP'
												placeholder='State'
												value={state}
												onOpen={toggleDropDown}
												onChangeText={(text) => setState(text)}
											/>
											<Button
												onPress={handleUpdate}
												className='grid-cols-1 self-center w-64 h-10 mt-3 mb-5 bg-stone-900'
												mode='contained'>
												update
											</Button>
										</KeyboardAvoidingView>
									</Modal>
								</Portal>
								<Button
									className='grid-cols-1 self-center w-64 h-10 mt-12 bg-stone-900'
									mode='contained'
									onPress={showModal}>
									Edit
								</Button>
							</Provider>
						</View>
					</KeyboardAvoidingView>
					<View className='absolute inset-x-0 bottom-8 h-16'>
						<FootBar />
					</View>
				</ImageBackground>
			)}
			{loading && (
				<ActivityIndicator
					className='flex-1 justify-center items-center'
					size={'large'}
					animating={true}
					color={MD2Colors.red800}
				/>
			)}
		</>
	);
}

const data = [
	{ label: 'ALABAMA', value: 'ALABAMA' },
	{ label: 'ALASKA', value: 'ALASKA' },
	{ label: 'AMERICAN SAMOA', value: 'AMERICAN SAMOA' },
	{ label: 'ARIZONA', value: 'ARIZONA' },
	{ label: 'ARKANSAS', value: 'ARKANSAS' },
	{ label: 'CALIFORNIA', value: 'CALIFORNIA' },
	{ label: 'COLORADO', value: 'COLORADO' },
	{ label: 'CONNECTICUT', value: 'CONNECTICUT' },
	{ label: 'DELAWARE', value: 'DELAWARE' },
	{ label: 'DISTRICT OF COLUMBIA', value: 'DISTRICT OF COLUMBIA' },
	{
		label: 'FEDERATED STATES OF MICRONESIA',
		value: 'FEDERATED STATES OF MICRONESIA',
	},
	{ label: 'FLORIDA', value: 'FLORIDA' },
	{ label: 'GEORGIA', value: 'GEORGIA' },
	{ label: 'GUAM', value: 'GUAM' },
	{ label: 'HAWAII', value: 'HAWAII' },
	{ label: 'IDAHO', value: 'IDAHO' },
	{ label: 'ILLINOIS', value: 'ILLINOIS' },
	{ label: 'INDIANA', value: 'INDIANA' },
	{ label: 'IOWA', value: 'IOWA' },
	{ label: 'KANSAS', value: 'KANSAS' },
	{ label: 'KENTUCKY', value: 'KENTUCKY' },
	{ label: 'LOUISIANA', value: 'LOUISIANA' },
	{ label: 'MAINE', value: 'MAINE' },
	{ label: 'MARSHALL ISLANDS', value: 'MARSHALL ISLANDS' },
	{ label: 'MARYLAND', value: 'MARYLAND' },
	{ label: 'MASSACHUSETTS', value: 'MASSACHUSETTS' },
	{ label: 'MICHIGAN', value: 'MICHIGAN' },
	{ label: 'MINNESOTA', value: 'MINNESOTA' },
	{ label: 'MISSISSIPPI', value: 'MISSISSIPPI' },
	{ label: 'MISSOURI', value: 'MISSOURI' },
	{ label: 'MONTANA', value: 'MONTANA' },
	{ label: 'NEBRASKA', value: 'NEBRASKA' },
	{ label: 'NEVADA', value: 'NEVADA' },
	{ label: 'NEW HAMPSHIRE', value: 'NEW HAMPSHIRE' },
	{ label: 'NEW JERSEY', value: 'NEW JERSEY' },
	{ label: 'NEW MEXICO', value: 'NEW MEXICO' },
	{ label: 'NEW YORK', value: 'NEW YORK' },
	{ label: 'NORTH CAROLINA', value: 'NORTH CAROLINA' },
	{ label: 'NORTH DAKOTA', value: 'NORTH DAKOTA' },
	{ label: 'NORTHERN MARIANA ISLANDS', value: 'NORTHERN MARIANA ISLANDS' },
	{ label: 'OHIO', value: 'OHIO' },
	{ label: 'OKLAHOMA', value: 'OKLAHOMA' },
	{ label: 'OREGON', value: 'OREGON' },
	{ label: 'PALAU', value: 'PALAU' },
	{ label: 'PENNSYLVANIA', value: 'PENNSYLVANIA' },
	{ label: 'PUERTO RICO', value: 'PUERTO RICO' },
	{ label: 'RHODE ISLAND', value: 'RHODE ISLAND' },
	{ label: 'SOUTH CAROLINA', value: 'SOUTH CAROLINA' },
	{ label: 'SOUTH DAKOTA', value: 'SOUTH DAKOTA' },
	{ label: 'TENNESSEE', value: 'TENNESSEE' },
	{ label: 'TEXAS', value: 'TEXAS' },
	{ label: 'UTAH', value: 'UTAH' },
	{ label: 'VERMONT', value: 'VERMONT' },
	{ label: 'VIRGIN ISLANDS', value: 'VIRGIN ISLANDS' },
	{ label: 'VIRGINIA', value: 'VIRGINIA' },
	{ label: 'WASHINGTON', value: 'WASHINGTON' },
	{ label: 'WEST VIRGINIA', value: 'WEST VIRGINIA' },
	{ label: 'WISCONSIN', value: 'WISCONSIN' },
	{ label: 'WYOMING', value: 'WYOMING' },
];
