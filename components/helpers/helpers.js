export const getCurrentDay = () => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

export const formatDate = (inputDateStr) => {
	const inputDate = new Date(inputDateStr);
	const day = inputDate.getDate();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[inputDate.getMonth()];
	const year = inputDate.getFullYear();
	return `${day} ${month} ${year}`;
}

export const formatTime = (currentDate) => {
	const currentHours = currentDate.getHours();
	const currentMinutes = currentDate.getMinutes();

	const formatNumber = (num) => (num < 10 ? `0${num}` : num);
	return `${formatNumber(currentHours)}:${formatNumber(currentMinutes)}`;
}
