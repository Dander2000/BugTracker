// import ListErrors from '../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
	ADMIN_PANEL_LOADED,
	ADMIN_PANEL_UNLOADED,
	// MY_APP_UNLOADED,
} from '../../constants/actionTypes';
import { Redirect } from 'react-router-dom';
import ProgrammerList from '../ProgrammerList';
import AppsAssign from './appsAssign';

const Promise = global.Promise;

const mapStateToProps = state => ({
	...state,
	currentUser: state.common.currentUser,
	programmers: state.programmerList.programmers,
	users: state.programmerList.users,
	apps: state.appList.apps,
	// appProgrammers: state.programmerList.myProgrammers
});

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
		dispatch({ type: ADMIN_PANEL_LOADED, payload }),
	onUnload: () =>
		dispatch({ type: ADMIN_PANEL_UNLOADED }),
	// onUpdateField: (key, value) =>
	// 	dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
});

class AdminPanel extends React.Component {

	// constructor() {
	// 	super();
	// 	// const updateFieldEvent =
	// 	// 	key => ev => this.props.onUpdateField(key, ev.target.value);
	// 	// this.changeName = updateFieldEvent('name');
	// 	// this.changeDescription = updateFieldEvent('description');

	// 	// this.submitForm = ev => {
	// 	// 	ev.preventDefault();
	// 	// 	const name = this.props.name;
	// 	// 	const description = this.props.description;
	// 	// 	if (name && description) {

	// 	// 	} else {
	// 	// 		console.log(name, description, 'nothin rly happends, but error will apear');
	// 	// 	}
	// 	// };

	// }

	componentDidMount() {
		this.props.onLoad(Promise.all([
			agent.Apps.all(),
			agent.Users.all(),
			agent.Users.programmers()
			//agent.Bugs.all()
		]));

		// if (this.props.match.params.slug !== nextProps.match.params.slug) {
		// 	if (nextProps.match.params.slug) {
		// 		this.props.onUnload();
		// 		return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
		// 	}
		// 	this.props.onLoad(null);
		// }
	}

	// componentDidUpdate() {

	// }

	componentWillUnmount() {
		this.props.onUnload();
	}

	render() {
		if (!this.props.currentUser) {
			return (
				<Redirect to="/login" />
			);
		};
		if (this.props.currentUser.privilege !== 3) {
			this.props.onUnload();
			return (
				<div className="banner">
					<div className="container">
						<h1 className="logo-font">
							Error: 401
						</h1>
						<p>Not enought permitions</p>
					</div>
				</div>
			);
		}
		if (!this.props.programmers || !this.props.users) {
			return (
				<div className="editor-page">
					<div className="container page">
						<div className="row">
							Loading...
						</div>
					</div>
				</div>
			);
		}
		console.log(this.props);
		return (
			<div className="editor-page">
				<div className="container page">
					<div className="row">
						<div className="col-md-12 flex-items-xl-center text-xs-center">
							{/* <ProgrammerList programmers={this.props.programmers} /> */}
							<ProgrammerList upgradable={true} programmers={this.props.users} />
							{this.props.apps ? (
								<AppsAssign />
							) : null}
							{/* <ListErrors errors={this.props.errors}></ListErrors> */}
							{/* <form>
								<fieldset>
									<fieldset className={"form-group"}>
										<input
											className={'form-control'}
											name={'app_name'}
											placeholder={"Name of new app"}
											onChange={this.changeName} />
									</fieldset>
									<fieldset className="form-group">
										<textarea
											className={"form-control"}
											rows={"6"}
											placeholder={"Description of new app"}
											value={this.props.details}
											onChange={this.changeDescription}>
										</textarea>
									</fieldset>
									<input
										className={"btn btn-lg pull-xs-right btn-primary"}
										type={"button"}
										disabled={this.props.inProgress}
										value={"Add new app to list"}
										onClick={this.submitForm} />
								</fieldset>
							</form> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
