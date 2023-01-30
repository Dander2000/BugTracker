export default (date) => {
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const d = new Date(date);
	let year = d.getFullYear();
	let month = months[d.getMonth()];
	let day = d.getDate();
	let hour = d.getHours();
	let minutes = d.getMinutes();

	return day + " " +
		month + " " +
		year + " " +
		('00' + hour).slice(-2) + ":" +
		('00' + minutes).slice(-2) + " ";
}