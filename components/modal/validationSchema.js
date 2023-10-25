import * as yup from 'yup';

export const validationSchema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	// Добавьте другие поля и правила валидации по вашему усмотрению
});
