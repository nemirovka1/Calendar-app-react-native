import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, Button, Modal, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import Geocoding from "react-native-geocoding";
import { ConfirmLocationModal } from "../allerts/ConfirmLocationModal";

export const AddLocationPageModal = ({closeModal, onLocationSelect}) => {
	const { t } = useTranslation()
	const [markerCoords, setMarkerCoords] = useState({
		latitude: 38.9944,
		longitude: -1.8584,
	});

	const [openConfirmModal, setOpenConfirmModal] = useState(false)
	const [location, setLocation] = useState('')
	Geocoding.init('My KEY')

	const handleMapPress = (event) => {
		setMarkerCoords(event.nativeEvent.coordinate);
	};
	const handleSaveLocation = async () => {
		const {latitude, longitude} = markerCoords
		try{
			const response = await Geocoding.from(latitude, longitude);
			const addressComponent =  response.results[0].address_components
			let street = '';
			let city = '';
			let country = '';
			let streetNumber ='';

			addressComponent.forEach(component => {
				if (component.types.includes('route')) {
					street = component.long_name;
				} else if (component.types.includes('street_number')) {
					streetNumber = component.long_name;
				} else if (component.types.includes('locality')) {
					city = component.long_name;
				} else if (component.types.includes('country')) {
					country = component.long_name;
				}
			});
			const fullAddress = `${streetNumber || ''} ${street + ' ,'|| ''} ${city + ' ,' || ''} ${country || ''}`;
			onLocationSelect(fullAddress)
			setLocation(fullAddress)
			setOpenConfirmModal(true)
		} catch ( error ) {
			console.log('Something went wrong')
		}
	};

	const toogleModal = () => {
		setOpenConfirmModal(!openConfirmModal)
	}
	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity onPress={closeModal}>
				<Text style={{ backgroundColor:"#ffff", color: 'black', fontSize: 18, textAlign: 'start',paddingTop: 30,paddingLeft: 10, paddingBottom: 10, fontWeight: 500}}>{t('Cancel')}</Text>
			</TouchableOpacity>
			<MapView
				style={{ flex: 1 }}
				provider={PROVIDER_GOOGLE}
				region={{
					latitude: markerCoords.latitude,
					longitude: markerCoords.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
				onPress={handleMapPress}
				zoomEnabled={true}
				minZoomLevel={10}
				maxZoomLevel={30}
				showsUserLocation={true}
			>
				<Marker coordinate={markerCoords} />
			</MapView>
			<TouchableOpacity onPress={handleSaveLocation}>
				<Text style={{ backgroundColor:"#762DD2", color: '#ffff', fontSize: 22, textAlign: 'center', padding: 15, fontWeight: 500}}>{t('Save')}</Text>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={openConfirmModal}
				visible={openConfirmModal}
				onBackdropPress={closeModal}
				onRequestClose={toogleModal}
			>
				<ConfirmLocationModal
					closeModal={()=> setOpenConfirmModal(false)}
					location={location}
					closeMapModal={closeModal}
					onLocationSelect={onLocationSelect}
				/>
			</Modal>
		</View>
	);
}
