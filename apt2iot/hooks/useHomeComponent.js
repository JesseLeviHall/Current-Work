import React, { createContext, useContext, useState } from 'react';

const HomeScreenComponent = createContext();

export const HomeScreenProvider = ({ children }) => {
	const [component, setComponent] = useState('Home');

	return (
		<HomeScreenComponent.Provider value={{ component, setComponent }}>
			{children}
		</HomeScreenComponent.Provider>
	);
};

export const useHomeComponent = () => useContext(HomeScreenComponent);
