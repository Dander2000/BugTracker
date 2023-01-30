import AppList from '../AppList';
import BugList from '../BugList';
import React from 'react';
import agent from '../../agent';
import formatDate from "./../../formatDate";
import ResetPass from './ResetPass';
import Forms from './Forms';
import { connect } from 'react-redux';
import { PROGRAMMER_LOADED, PROGRAMMER_UNLOADED } from '../../constants/actionTypes';

const Promise = global.Promise;

const Content = props => {
	if (!props.user) {
		return null;
	}
	if (props.user.privilege > 1) {
		return (
			<article className="row article-content">
				<div className="col-xs-4">
					<div className='banner'>
						<div className='container'>
							<h4>
								Applications:
							</h4>
						</div>
					</div>
					<AppList apps={props.apps} />
				</div>
				<div className="col-xs-4">
					<div className='banner'>
						<div className='container'>
							<h4>
								Last Bugs:
							</h4>
						</div>
					</div>
					<BugList bugs={props.bugs} />
				</div>
				<div className="col-xs-4">
					<div className='banner'>
						<div className='container'>
							<h4>
								Last Reports:
							</h4>
						</div>
					</div>
					<BugList bugs={props.reports} />
				</div>
			</article>
		);
	}
	return (
		<article className="row article-content">
			<div className="col-xs-12">
				<div className='banner'>
					<div className='container'>
						<h4>
							Last Reports:
						</h4>
					</div>
				</div>
				<BugList bugs={props.reports} />
			</div>
		</article>
	);
}

const mapStateToProps = state => ({
	...state,
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
		dispatch({ type: PROGRAMMER_LOADED, payload }),
	onUnload: () =>
		dispatch({ type: PROGRAMMER_UNLOADED })
});

class User extends React.Component {
	componentDidMount() {
		this.props.onLoad(Promise.all([
			agent.Users.get(this.props.match.params.id),
			agent.Bugs.byProgrammer(this.props.match.params.id),
			agent.Apps.byAuthor(this.props.match.params.id),
			agent.Bugs.byAuthor(this.props.match.params.id)
		]));
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	render() {
		if (!this.props.currentUser) {
			return null;
		}
		if (!this.props.programmerList.user) {
			return (
				<div className="article-page">
					<div className="container page">
						<div className="row article-content">
							Loading content...
						</div>
					</div>
				</div>
			);
		}
		const user = this.props.programmerList.user;
		if (user.length === 0) {
			return (
				<div className="article-page">
					<div className="banner">
						<div className="container">
							<h1>
								No such a bug...
							</h1>
						</div>
					</div>
				</div>
			);
		}
		return (
			<article>
				<article className="article-page">
					<div className="banner">
						<div className="container">
							<h1>{user.firstName} {user.nick ? `"${user.nick}"` : null} {user.surname}</h1>
						</div>
					</div>
				</article>
				<article className='container page'>
					<header className='row'>
						<h2>Details</h2>
					</header>
					<article className='row'>
						<div className='col-md-2'>
							<b>
								Contact:
							</b>
						</div>
						<div className='col-md-8'>
							<i>{user.mail}</i>
						</div>
					</article>
					<article className='row'>
						<div className='col-md-2'>
							<b>
								In company from:
							</b>
						</div>
						<div className='col-md-8'>
							<i>
								{formatDate(user.createdAt)}
							</i>
						</div>
					</article>

					<hr />
					<Content user={user} apps={this.props.appList.apps} bugs={this.props.bugList.bugs} reports={this.props.bugList.reports} />
					{/* <hr />
					<div className='row'>
						<div className='col-md-12'>
							TODO: STATISTIC
						</div>
					</div> */}
					<hr />
					<Forms submitForm={this.props.submitForm} inProgress={this.props.inProgress} currentUser={this.props.currentUser} user={user} />
					<hr />
					<ResetPass submitForm={this.props.submitForm} inProgress={this.props.inProgress} currentUser={this.props.currentUser} user={user} />
				</article>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
