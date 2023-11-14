import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [selectedLanguage, setSelectedLanguage] = useState('en');

	const changeLanguage = (language) => {
		setSelectedLanguage(language);
	};

	return (
		<LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	return useContext(LanguageContext);
};
