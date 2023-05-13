import ProgrammerList from '../ProgrammerList';
import React from 'react';
import formatDate from "./../../formatDate";
import agent from '../../agent';
import { connect } from 'react-redux';
import {
	ASSIGN_PROGRAMMER_TO_BUG,
	BUG_LOADED,
	BUG_UNLOADED,
	FINISH_TASK
} from '../../constants/actionTypes';
import { Link } from 'react-router-dom';

const Promise = global.Promise;

const FinishTask = props => {
	if (props.bug.finished.data[0] === 1) {
		return null;
	}
	if (props.bug.ProgressingBy !== props.currentUser.idUser) {
		return null;
	}
	return (
		<div>
			<button onClick={props.onClick}>
				Finish Task
			</button>
		</div>
	);
}

const ProgrammerDetails = props => {
	if (!props.bug.ProgressingBy) {
		return (
			<article className='row'>
				<div className='col-md-2'>
					<b>
						Programmer:
					</b>
				</div>
				<div className='col-md-8'>
					<i>	"" </i>
				</div>
			</article>
		);
	}
	return (
		<article className='row'>
			<div className='col-md-2'>
				<b>
					Programmer:
				</b>
			</div>
			<div className='col-md-8'>
				<i>
					<Link to={'/users/' + props.bug.ProgressingBy}>
						{props.bug.programmerName}	"{props.bug.programmerNick}" {props.bug.programmerSurname}<br />
						Mail: {props.bug.programmerMail}<br />
					</Link>
				</i>
			</div>
		</article>
	);
}


const Assigning = props => {
	if (props.bug.finished.data[0]) {
		return null;
	}
	if (!(props.currentUser.privilege === 2 || props.currentUser.privilege === 3)) {
		return null;
	}
	return (
		<div>
			<ProgrammerList programmers={props.programmers} currentUser={props.currentUser} assign={props.bug} onClick={props.onClick} />
		</div>
	);
}

const mapStateToProps = state => ({
	...state.bugList,
	currentUser: state.common.currentUser,
	programmers: state.programmerList.programmers
});

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
		dispatch({ type: BUG_LOADED, payload }),
	onUnload: () =>
		dispatch({ type: BUG_UNLOADED }),
	onAssign: (payload, currentUser, redirectTo) =>
		dispatch({ type: ASSIGN_PROGRAMMER_TO_BUG, payload, currentUser, redirectTo }),
	onFinish: (payload, redirectTo) =>
		dispatch({ type: FINISH_TASK, payload, redirectTo })
});

class Bug extends React.Component {
	componentDidMount() {
		this.props.onLoad(Promise.all([
			agent.Bugs.get(this.props.match.params.id),
			agent.Users.bugProgrammers(this.props.match.params.id)
		]));
	}

	componentWillUnmount() {
		this.props.onUnload();
	}

	finish = () => {
		this.props.onFinish(Promise.all([
			agent.Bugs.finish(this.props.bug.idBug),
		]), `/`);
	}

	render() {
		if (!this.props.bug) {
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
		if (this.props.bug.length === 0) {
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
			<div className="article-page">
				<div className="banner">
					<div className="container">

						<h1>ID: {('000000' + this.props.bug.idBug).slice(-6)}</h1>
						<h4 title={this.props.bug.information}>
							Type: {this.props.bug.title}
						</h4>
					</div>
				</div>
				<div className="row" style={{ backgroundColor: this.props.bug.finished.data[0] ? '#0b0' : '#555', color: 'white', height: '3em' }}>
					<div className='container'>
						<h4>
							{this.props.bug.finished.data[0] ? "Solved" : "To Fix"}
						</h4>
					</div>
				</div>
				<div className="container page">
					<header className='row'>
						<h2>Details</h2>
					</header>
					<article className='row'>
						<div className='col-md-2'>
							<b>
								Description:
							</b>
						</div>
						<div className='col-md-8'>
							<i>{this.props.bug.details}</i>
						</div>
					</article>
					<article className='row'>
						<div className='col-md-2'>
							<b>
								Application:
							</b>
						</div>
						<div className='col-md-8'>
							<i>
								<Link to={'/apps/' + this.props.bug.appId}>
									name: {this.props.bug.name}<br />
									appState: {this.props.bug.appState}
								</Link>
							</i>
						</div>
					</article>
					<article className='row'>
						<div className='col-md-2'>
							<b>
								Author:
							</b>
						</div>
						<div className='col-md-8'>
							<i>
								<Link to={'/users/' + this.props.bug.createdBy} >
									{this.props.bug.bugReporterName} "{this.props.bug.bugReporterNick}" {this.props.bug.bugReporterSurname}<br />
									Mail: {this.props.bug.bugReporterMail}<br />
								</Link>
							</i>
						</div>
					</article>
					<ProgrammerDetails bug={this.props.bug} />
					<article className='row'>
						<div className='col-md-2'>
							<b>
								bugCreatedAt:
							</b>
						</div>
						<div>{formatDate(this.props.bug.bugCreatedAt)}
						</div>
					</article>
					<article className='row'>
						<div className='col-md-2'>
							<b>
								lastUpdate:
							</b>
						</div>
						<div>
							{formatDate(this.props.bug.lastUpdate)}
						</div>
					</article>
					<div className="row article-content">
						<FinishTask bug={this.props.bug} currentUser={this.props.currentUser} onClick={this.finish} />
						<div className="col-xs-12">
							<Assigning bug={this.props.bug} programmers={this.props.programmers} currentUser={this.props.currentUser} onClick={this.props.onAssign} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Bug);
