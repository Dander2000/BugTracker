export function validate(p1, p2, p3) {

	let errors = [];
	if (!p1) errors.push('App is required');
	if (!p2) errors.push('Bug type is required');
	if (!p3) errors.push('Description of bug is required');

	return errors;
}