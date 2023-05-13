import { Link } from 'react-router-dom';
import ListErrors from './../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { validate } from "./validate";
import {
	UPDATE_FIELD_AUTH,
	REGISTER,
	ERROR,
	REGISTER_PAGE_UNLOADED
} from './../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
	...state.auth
});

const mapDispatchToProps = dispatch => ({
	onChangeEmail: value =>
		dispatch({ type: UPDATE_FIELD_AUTH, key: 'mail', value }),
	onChangePassword: value =>
		dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
	onChangePassword2: value =>
		dispatch({ type: UPDATE_FIELD_AUTH, key: 'password2', value }),
	onChangeNick: value =>
		dispatch({ type: UPDATE_FIELD_AUTH, key: 'nick', value }),
	onChangeFirstName: value =>
		dispatch({ type: UPDATE_FIELD_AUTH, key: 'firstName', value }),
	onChangeSurname: value =>
		dispatch({ type: UPDATE_FIELD_AUTH, key: 'surname', value }),
	onSubmit: payload =>
		dispatch({
			type: REGISTER, payload
		}),
	onFailed: error =>
		dispatch({ type: ERROR, error }),
	onUnload: () =>
		dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
	constructor() {
		super();
		this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
		this.changeNick = ev => this.props.onChangeNick(ev.target.value);
		this.changePassword = ev => this.props.onChangePassword(ev.target.value);
		this.changePassword2 = ev => this.props.onChangePassword2(ev.target.value);
		this.changeFirstName = ev => this.props.onChangeFirstName(ev.target.value);
		this.changeSurname = ev => this.props.onChangeSurname(ev.target.value);
		this.submitForm = (firstName, surname, nick, mail, password, password2) => ev => {
			ev.preventDefault();
			let errors = [];
			console.log(validate(firstName, surname, nick, mail, password, password2));
			errors.push(...validate(firstName, surname, nick, mail, password, password2));
			if (errors.length === 0) {
				this.props.onSubmit(Promise.all([
					agent.Auth.register(firstName, surname, nick, mail, password)
				]));
			} else {
				this.props.onFailed(errors);
			}
		}
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	render() {
		const firstName = this.props.firstName;
		const surname = this.props.surname;
		const nick = this.props.nick;
		const mail = this.props.mail;
		const password = this.props.password;
		const password2 = this.props.password2;

		return (
			<div className="auth-page">
				<div className="container page">
					<div className="row">
						<div className="col-md-6 offset-md-3 col-xs-12">
							<h1 className="text-xs-center">Sign Up</h1>
							<p className="text-xs-center">
								<Link to="/login">
									Have an account?
								</Link>
							</p>

							<ListErrors errors={this.props.errors} />

							{/* <form onSubmit={this.submitForm(username, email, password)}> */}
							<form onSubmit={this.submitForm(firstName, surname, nick, mail, password, password2)}>
								{/* <form> */}
								<fieldset>

									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											type="text"
											placeholder="First name"
											value={firstName}
											onChange={this.changeFirstName} />
									</fieldset>

									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											type="text"
											placeholder="Surname"
											value={surname}
											onChange={this.changeSurname} />
									</fieldset>

									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											type="text"
											placeholder="Nick"
											value={nick}
											onChange={this.changeNick} />
									</fieldset>

									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											type="email"
											placeholder="Mail"
											value={mail}
											onChange={this.changeEmail} />
									</fieldset>

									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											type="password"
											placeholder="Password"
											value={password}
											onChange={this.changePassword} />
									</fieldset>

									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											type="password"
											placeholder="Repeat password"
											value={password2}
											onChange={this.changePassword2} />
									</fieldset>

									<button
										className="btn btn-lg btn-primary pull-xs-right"
										type="submit"
										disabled={this.props.inProgress}>
										Sign up
									</button>

								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
