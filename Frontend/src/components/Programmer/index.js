import AppList from '../AppList';
import BugList from '../BugList';
import React from 'react';
import agent from '../../agent';
import formatDate from "./../../formatDate.js";
import { connect } from 'react-redux';
import { PROGRAMMER_LOADED, PROGRAMMER_UNLOADED } from '../../constants/actionTypes';

const Promise = global.Promise;

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

class Programmer extends React.Component {
	componentDidMount() {
		this.props.onLoad(Promise.all([
			agent.Users.get(this.props.match.params.id),
			agent.Bugs.byProgrammer(this.props.match.params.id),
			agent.Apps.byAuthor(this.props.match.params.id)
		]));

	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	render() {
		if (!this.props.programmerList.programmer) {
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
		const programmer = this.props.programmerList.programmer;
		if (programmer.length === 0) {
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
							<h1>{programmer.firstName} "{programmer.nick}" {programmer.surname}</h1>
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
							<i>{programmer.mail}</i>
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
								{formatDate(programmer.createdAt)}
							</i>
						</div>
					</article>
					<hr />
					<article className="row article-content">
						<div className="col-xs-6">
							<div className='banner'>
								<div className='container'>
									<h4>
										Applications:
									</h4>
								</div>
							</div>
							<AppList apps={this.props.appList.apps} />
						</div>
						<div className="col-xs-6">
							<div className='banner'>
								<div className='container'>
									<h4>
										Last Bugs:
									</h4>
								</div>
							</div>
							<BugList bugs={this.props.bugList.bugs} />
						</div>
					</article>
					<div className='row'>
						<div className='col-md-12'>
							TODO: STATISTIC
						</div>
					</div>
				</article>
			</article>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Programmer);
