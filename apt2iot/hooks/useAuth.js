import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Alert } from 'react-native';
import * as api from '../api/index';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [token, setToken] = useState({});
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [loadingInitial, setLoadingInitial] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = await api.getClientToken();
				if (token) {
					setIsAuthorized(true);
					setToken(token);
				} else {
					await api.logout();
					setIsAuthorized(false);
					setLoading(false);
				}
			} catch (err) {
				setLoading(false);
				setError(err);
				console.log(err);
			} finally {
				setLoadingInitial(false);
			}
		};
		checkAuth();
	}, []);

	async function handleLogin() {
		setLoading(true);
		const userData = { email, password };
		try {
			const response = await api.getServerToken(userData);
			if (response.token) {
				setIsAuthorized(true);
				setLoading(false);
				setToken(response.token);
			} else {
				setLoading(false);
				setIsAuthorized(false);
				Alert.alert(response);
			}
		} catch (error) {
			setLoading(false);
			setIsAuthorized(false);
			console.log(error);
		}
	}

	const logout = async () => {
		setLoading(true);
		try {
			await api.logout();
			setIsAuthorized(false);
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(err);
			console.log(error);
		}
	};

	//client token
	// Make the provider update only when it should.
	// We only want to force re-renders if the user,
	// loading or error states change.
	// Whenever the `value` passed into a provider changes,
	// the whole tree under the provider re-renders, and
	// that can be very costly! Even in this case, where
	// you only get re-renders when logging in and out
	// we want to keep things very performant.
	const memoedValue = useMemo(
		() => ({
			email,
			setEmail,
			password,
			setPassword,
			isAuthorized,
			setIsAuthorized,
			token,
			loading,
			setLoading,
			error,
			setError,
			handleLogin,
			logout,
		}),
		[email, password, isAuthorized, token, loading, error, handleLogin, logout]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!loadingInitial && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
