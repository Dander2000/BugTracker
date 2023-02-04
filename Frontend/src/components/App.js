import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import { store } from '../store';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';

import Bug from "../components/Bug";
import MadeApps from "../components/MadeApps";
import MadeApp from "../components/MadeApp";
import Programmers from "../components/Programmers";
import User from "../components/User";
import NewBug from "../components/NewBug";
import NewMadeApp from "../components/NewMadeApp";
import AdminPanel from "../components/AdminPanel";
import Error404 from "../components/404";


const mapStateToProps = state => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
		currentUser: state.common.currentUser,
		redirectTo: state.common.redirectTo
	}
};

const mapDispatchToProps = dispatch => ({
	onLoad: (payload, token) =>
		dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
	onRedirect: () =>
		dispatch({ type: REDIRECT })
});

class App extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.redirectTo) {
			store.dispatch(push(nextProps.redirectTo));
			this.props.onRedirect();
		}
	}

	componentDidMount() {
		const token = window.localStorage.getItem('jwt');
		// const token = document.cookie.getItem('jwt');
		if (token) {
			agent.setToken(token);
		}
		this.props.onLoad(token ? agent.Auth.current() : null, token);
	}

	render() {
		if (this.props.appLoaded) {
			return (
				<div>
					<Header
						appName={this.props.appName}
						currentUser={this.props.currentUser} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route path="/bugs/create/:idApp" component={NewBug} />
						<Route exact path="/bugs/create" component={NewBug} />
						<Route path="/bugs/:id" component={Bug} />
						<Route exact path="/apps/create" component={NewMadeApp} />
						<Route path="/apps/:id" component={MadeApp} />
						<Route exact path="/apps" component={MadeApps} />
						<Route exact path="/programmers" component={Programmers} />
						<Route path="/users/:id" component={withRouter(User)} />
						<Route exact path="/adminPanel" component={AdminPanel} />
						<Route path="/" component={Error404} />
					</Switch>
				</div>
			);
		}
		return (
			<div>
				<Header
					appName={this.props.appName}
					currentUser={this.props.currentUser} />
			</div>
		);
	}
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
