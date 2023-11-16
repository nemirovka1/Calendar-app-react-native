// ThemeContext.js
import { createContext, useState } from 'react';
import { darkTheme, lightTheme } from "./theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(lightTheme);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
