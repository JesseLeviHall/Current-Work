import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';
import {
	Home,
	Login,
	SecuritySettings,
	Signup,
	Profile,
	ContactSupport,
	ShareAccess,
	MaintReq,
	DeliveryInfo,
	PayBills,
	MessageBoard,
	SingleDateSet,
} from './screens/Screen_Index';
import SetAutomations from './screens/SetAutomations';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { isAuthorized } = useAuth();
	return (
		<Stack.Navigator
			defaultScreenOptions={{
				headerShown: false,
			}}>
			{isAuthorized ? (
				<>
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='ProfileUpdate' component={Profile} />
					<Stack.Screen name='SecuritySettings' component={SecuritySettings} />
					<Stack.Screen name='ContactSupport' component={ContactSupport} />
					<Stack.Screen name='ShareAccess' component={ShareAccess} />
					<Stack.Screen name='MaintReq' component={MaintReq} />
					<Stack.Screen name='DeliveryInfo' component={DeliveryInfo} />
					<Stack.Screen name='PayBills' component={PayBills} />
					<Stack.Screen name='MessageBoard' component={MessageBoard} />
					<Stack.Screen name='SetAutomations' component={SetAutomations} />
				</>
			) : (
				<Stack.Group>
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='SignUp' component={Signup} />
				</Stack.Group>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
