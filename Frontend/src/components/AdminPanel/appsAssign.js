import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
	UPGRADE_APP,
	DOWNGRADE_APP,
	MY_APP_LOADED,
	// MY_APP_UNLOADED,
	ASSIGN_PROGRAMMER_TO_APP
} from '../../constants/actionTypes';
import AppList from '../AppList';

const mapStateToProps = state => ({
	...state,
	currentUser: state.common.currentUser,
	programmers: state.programmerList.programmers,
	users: state.programmerList.users,
	apps: state.appList.apps,
	appProgrammers: state.programmerList.myProgrammers
})

const mapDispatchToProps = dispatch => ({
	onAppLoad: (payload, ids) =>
		dispatch({ type: MY_APP_LOADED, payload, ids }),

	onAssign: (payload, currentUser, redirectTo) =>
		dispatch({ type: ASSIGN_PROGRAMMER_TO_APP, payload, currentUser, redirectTo }),
	onUpgrade: (payload, currentUser, redirectTo) =>
		dispatch({ type: UPGRADE_APP, payload, currentUser, redirectTo }),
	onDowngrade: (payload, currentUser, redirectTo) =>
		dispatch({ type: DOWNGRADE_APP, payload, currentUser, redirectTo })
});

class AppsAssign extends React.Component {

	componentDidMount() {
		console.log(this.props.programmerList);
		const payload = [agent.Apps.all(),
		agent.Users.all(),
		agent.Users.programmers()];
		const ids = [];
		this.props.apps.map(app => {
			payload.push(agent.Users.appProgrammers(app.idApp));
			ids.push(app.idApp);
		});
		console.log(payload, ids);
		this.props.onAppLoad(Promise.all(payload), ids);

	}

	render() {
		console.log(this.props);
		if (!this.props.programmerList.myProgrammers) {
			return null;
		}
		return (
			<nav className="navbar navbar-light">
				<div className="container">
					<AppList upgradable={this.props.programmerList.myProgrammers} onUpgrade={this.props.onUpgrade} onDowngrade={this.props.onDowngrade} apps={this.props.apps} programmers={this.props.programmers} onClick={this.props.onAssign} currentUser={this.props.currentUser} />
				</div>
			</nav>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppsAssign);