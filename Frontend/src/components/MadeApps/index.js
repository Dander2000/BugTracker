import MainView from './MainView';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	APPS_LOADED,
	APPS_UNLOADED
} from '../../constants/actionTypes';

const AddApp = props => {
	if (!props.currentUser) {
		return null;
	}
	if (props.currentUser.privilege === 3) {
		return (
			<div className="col-md-3">
				<div className="sidebar">
					<Link to={`/apps/create`} className="preview-link">
						TODO: Dodaj aplikacje
					</Link>
				</div>
			</div>
		)
	} else {
		return null;
	}
}

const mapStateToProps = state => ({
	...state,
	// appName: state.common.appName,
	token: state.common.token
});

const mapDispatchToProps = dispatch => ({
	onLoad: (tab, pager, payload) =>
		dispatch({ type: APPS_LOADED, tab, pager, payload }),
	onUnload: () =>
		dispatch({ type: APPS_UNLOADED })
});

class MadeApps extends React.Component {
	componentDidMount() {
		const tab = 'all';
		const appsPromise = agent.Apps.all;
		this.props.onLoad(tab, appsPromise, appsPromise());
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	render() {
		return (
			<div className="home-page">
				<div className="banner">
					<div className="container">
						<h1>Aplications</h1>
					</div>
				</div>
				<div className="container page">
					<div className="row">
						<MainView currentUser={this.props.common.currentUser} />
						<AddApp currentUser={this.props.common.currentUser} />
					</div>
				</div>

			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MadeApps);
