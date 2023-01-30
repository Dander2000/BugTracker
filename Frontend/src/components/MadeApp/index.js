import ProgrammerList from '../ProgrammerList';
import BugList from '../BugList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { APP_LOADED, APP_UNLOADED } from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
	...state,
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
		dispatch({ type: APP_LOADED, payload }),
	onUnload: () =>
		dispatch({ type: APP_UNLOADED })
});

class MadeApp extends React.Component {
	componentDidMount() {
		this.props.onLoad(Promise.all([
			agent.Apps.get(this.props.match.params.id),
			agent.Users.appProgrammers(this.props.match.params.id),
			agent.Bugs.byApp(this.props.match.params.id)
		]));
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	render() {
		if (!this.props.appList.app) {
			return (
				<div className="container page">

					<div className="row article-content">
						No such a app...
					</div>
				</div>
			);
		}
		return (
			<div className="article-page">

				<div className="banner">
					<div className="container">
						<h1>{this.props.appList.app.name}</h1>
						<h5>{this.props.appList.app.appState}</h5>
					</div>
				</div>
				<div className="container page">
					<div className="row article-content">
						<div className="col-md-12">
							<p>{this.props.appList.app.description}</p>

							<div className='row'>
								TODO: Statistic
							</div>

							<div className='row'>
								<div className="col-md-6">
									<div className="banner">
										<div className="container">
											<h3>Programmers</h3>
										</div>
									</div>
									<ProgrammerList programmers={this.props.programmerList.programmers} />
								</div>
								<div className="col-md-6">
									<div className="banner">
										<div className="container">
											<h3>Bugs</h3>
										</div>
									</div>
									<BugList bugs={this.props.bugList.bugs} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MadeApp);
