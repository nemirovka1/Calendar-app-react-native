import { useLanguage } from './LanguageContext';
import i18n from './i18n';
import { Button } from "react-native";

export const LanguageSwitcher = () => {
	const availableLanguages = ['es','en']
	const { selectedLanguage, changeLanguage } = useLanguage();

	const changeAppLanguage = () => {
		const nextLanguageIndex = (availableLanguages.indexOf(selectedLanguage) + 1) % availableLanguages.length;
		const nextLanguage = availableLanguages[nextLanguageIndex];
		changeLanguage(nextLanguage);
		i18n.changeLanguage(nextLanguage);
	};

	return <Button onPress={changeAppLanguage} title={'Click to change language'} />;
};
