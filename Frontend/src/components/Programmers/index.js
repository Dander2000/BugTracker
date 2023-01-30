import ProgrammerList from '../ProgrammerList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { PROGRAMMERS_LOADED, PROGRAMMERS_UNLOADED } from '../../constants/actionTypes';
import { Redirect } from 'react-router';

// const Promise = global.Promise;

const mapStateToProps = state => ({
	...state.programmerList,
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
	onLoad: payload => {
		dispatch({ type: PROGRAMMERS_LOADED, payload })
	},
	onUnload: () =>
		dispatch({ type: PROGRAMMERS_UNLOADED })
});

const Content = props => {
	if (!props.programmerList) {
		return (
			<div className="container page">
				<div className="row article-content">
					Loading content...
				</div>
			</div>
		);
	}
	if (props.programmerList.lenght === 0) {
		return (
			<div className="container page">
				<div className="row article-content">
					No programmes here yet...
				</div>
			</div>
		);

	} else {
		return (
			<div className="container page">
				<div className="row article-content">
					<ProgrammerList programmers={props.programmerList.users} currentUser={props.currentUser} />
				</div>
			</div>
		);
	}
}

class Programmers extends React.Component {
	componentDidMount() {
		this.props.onLoad(agent.Users.programmers());
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	render() {
		if (!this.props.currentUser) {
			return (
				<Redirect to="/login" />
			);
		};
		return (
			<div className="home-page">
				<div className="banner">
					<div className="container">
						<h1>Programmers</h1>
					</div>
				</div>
				<Content programmerList={this.props.programmerList} currentUser={this.props.currentUser} />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Programmers);
