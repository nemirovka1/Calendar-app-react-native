import * as yup from 'yup';
export const validationSchema = yup.object().shape({
	title: yup.string().required("Title is required"),
	description: yup.string().required('Description is required'),
	startDate: yup.date().required('Start date is required').max(yup.ref('endDate'), 'Start date must be before or equal to end date'),
	endDate: yup
		.date()
		.required('End date is required')
		.min(yup.ref('startDate'), 'End date must be after or equal to start date'),
});
