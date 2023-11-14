import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
	.use(initReactI18next)
	.init({
		resources: {
			es: {
				translation: {
					"Main Title": 'Que tenga un buen día',
					"Work": 'Trabajar',
					"University": 'Universidad',
					"Home": 'Hogar',
					"Tasks": 'Tareas',
					"Type Task": 'Tipo tarea',
					"Calendar": 'Calendario',
					"Create Task":'Crear tarea',
					"Weather": 'Clima',
					"Feels like":"Se siente como",
					"Humidity":"Humedad",
					"Wind Speed":"Velocidad del viento",
					"Search city":'Buscar ciudad',
					"Cancel": 'Cancelar',
					"Category": 'Categoría',
					"Name": 'Nombre',
					"Starts": 'Empieza',
					"Ends": 'Termina',
					"Description": 'Descripción',
					"DescText": 'Escribe tu descripción aquí, por favor.',
					"Add Task": "Agregar tarea",
					"Edit Task": 'Editar tarea',
					"Choose category": "Elegir la categoría",
				},
			},
			en: {
				translation: {
					"Main Title": 'Have a good day',
					"Work": 'Work',
					"University": 'University',
					"Home": 'Home',
					"Tasks": 'Tasks',
					"Type Task": 'Type Task',
					"Calendar": 'Calendar',
					"Create Task": 'Create Task',
					"Weather": 'Weather',
					"Feels like":"Feels like",
					"Humidity":"Humidity",
					"Wind Speed":"Wind Speed",
					"Search city": 'Search city',
					"Cancel": 'Cancel',
					"Category": 'Category',
					"Name": 'Name',
					"Starts": 'Starts',
					"Ends": 'Ends',
					"Description": 'Description',
					"DescText": 'Write your description here, please',
					"Add Task": "Add Task",
					"Edit Task": "Edit Task",
					"Choose category": "Choose category",
				},
			},
		},
		lng: 'en',
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
