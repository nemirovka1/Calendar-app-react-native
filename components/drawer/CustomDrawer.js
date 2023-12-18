import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LanguageSwitcher } from "../i18n/LanguageSwitcher";
import { ThemeSwitcher } from "../i18n/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import QRCodeGenerator from "../QrCode";

export const SideMenu = ({ isOpen, onClose }) => {
	const { t } = useTranslation()
	const [openModal, setOpenModal] = useState(false)

	const toggleModal = () => {
		setOpenModal(!openModal)
	}
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isOpen}
			onRequestClose={onClose}
		>
			<View style={styles.menuContainer}>
					<Text style={styles.textLogo}> Welcome! </Text>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButton}>✕</Text>
					</TouchableOpacity>
				<Image source={require('../assets/logo.png')} style={styles.imageLogo}/>
				<View style={styles.menuContent}>
					<View style={styles.languageContainer}>
						<Text style={styles.languageText}>{t("Select language")}</Text>
						<LanguageSwitcher/>
					</View>
					<View style={styles.themeContainer}>
						<Text style={styles.languageText}>{t("Select theme")}</Text>
						<ThemeSwitcher/>
					</View>

					<Modal
						animationType="slide"
						transparent={openModal}
						visible={openModal}
						onRequestClose={toggleModal}
					>
						<QRCodeGenerator closeModal={()=> setOpenModal( false )}/>
					</Modal>
				</View>
				<TouchableOpacity onPress={()=> setOpenModal( true)} style={{ position: 'absolute', bottom: 30, justifyContent: 'center'}}>
					<Text style={styles.bottomText}> Scan Me !</Text>
				</TouchableOpacity>
				<Text style={styles.bottomText}> © 2023 ANT.Version 1.0</Text>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	menuContainer: {
		display: 'flex',
		width: 200,
		height: '100%',
		backgroundColor: '#5F3FF7',
		paddingTop: 60,
		borderTopRightRadius: 20,
		borderBottomEndRadius: 20,
	},
	closeButton: {
		position: 'absolute',
		right: 5,
		top: 25,
		fontSize: 20,
		fontWeight: 900,
		color: '#fff',
	},
	menuContent: {
		display: 'flex',
		gap: 30,
		padding: 10,
		paddingTop: 40,
	},
	textLogo: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 500,
		textAlign: 'center',
	},
	imageLogo: {
		width: 202,
		height: 162,
	},
	bottomText: {
		position: 'absolute',
		bottom: 10,
	    textAlign: "center",
		color: '#fff',
		padding: 10,
	},
	languageContainer: {
		display: 'flex',
		flexDirection: "column",
		gap: 10,
	},
	languageText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 400,
	},
	themeContainer: {
		display: 'flex',
		flexDirection: "column",
		gap: 10,
	}
});
