export function validate(firstName, surname, nick, mail, password, password2) {

	let errors = [];

	if (!firstName) {
		errors.push('First name is required')
	} else if (firstName.search(/[a-zA-Z]/) < 0) {
		errors.push('First name must include only letters1');
	} else if (firstName.search(/[0-9]/) >= 0) {
		errors.push('First name must include ONLY letters2');
	} else if (firstName.search(/[-+/*=\\&$]/) >= 0) {
		errors.push('First name must include ONLY letters3');
	}
	if (!surname) {
		errors.push('Surname is required');
	} else if (surname.search(/[a-zA-Z]+/) < 0) {
		errors.push('Surname must include only letters');
	} else if (surname.search(/[0-9]/) >= 0) {
		errors.push('Surname must include ONLY letters');
	} else if (surname.search(/[-+/*=\\&$]/) >= 0) {
		errors.push('Surname must include ONLY letters');
	}
	if (nick) {
		if (nick.search(/[a-zA-Z0-9]/) < 0) {
			errors.push('Nick must include only letters');
		}
		if (nick.search(/[-+/*=\\&$]/) >= 0) {
			errors.push('Nick can`t include special sign');
		}
	}
	if (!mail) {
		errors.push('Mail is required')
	} else if (!mail.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
		errors.push('Your mail is not correct');
	}
	if (!password) {
		errors.push('Password is required')
	} else if (password.search(/[\\&$]/) >= 0) {
		errors.push('Nick can`t include special sign Like (" & $ \\ / ")');
	} else if (password !== password2) {
		errors.push('Passwords must be the same');
	}
	return errors;
}