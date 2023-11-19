import { createContext, useCallback, useState } from 'react';
import { darkTheme, lightTheme } from "./theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(lightTheme);

	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => prevTheme === lightTheme ? darkTheme : lightTheme);
	}, [setTheme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
