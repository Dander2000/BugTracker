import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import formatDate from "./../formatDate.js";

const AssignToBug = props => {
	if (props.programmer.idUser === props.bug.ProgressingBy) {
		return (
			<div>
				ASSIGNED
			</div>
		);
	}
	if (props.currentUser.idUser === props.programmer.idUser) {
		return (
			<div>
				<Link onClick={() => props.onClick(Promise.all([agent.Bugs.assign(props.bug.idBug, props.programmer.idUser)]), props.currentUser, `/bugs/${props.bug.idBug}`)} to={`/`} >
					ASSIGN BUG TO YOURSELF
				</Link>
			</div>
		);
	}
	return (
		<div>
			<Link onClick={() => props.onClick(Promise.all([agent.Bugs.assign(props.bug.idBug, props.programmer.idUser)]), props.currentUser, `/bugs/${props.bug.idBug}`)} to={`/`} >
				ASSIGN BUG
			</Link>
		</div>
	);
}

const AssignToApp = props => {
	console.log(props);
	let isAssigned = false;
	const res = props.myProgrammers[props.idApp].map((progr, i) => {
		if (props.programmer.idUser === progr.idUser) {
			isAssigned = true;
			return (
				<div>
					ASSIGNED
				</div>
			);
		}
	});
	return isAssigned ? res : (
		<div>
			<Link onClick={() => props.onClick(Promise.all([agent.Apps.assign(props.idApp, props.programmer.idUser)]), props.currentUser, `/adminPanel`)} to={`/adminPanel`} >
				ASSIGN
			</Link>
		</div>
	);
}

// const EmeryturaButton = props => {
// 	if (!props.currentUser) {
// 		return null;
// 	}
// 	if (props.currentUser.privilege === 3) {
// 		return (
// 			<div>
// 				TODO: Emerytura
// 			</div>
// 		);
// 	}
// 	else {
// 		return null;
// 	}
// }

const ProgrammerPreview = props => {
	console.log(props);
	const programmer = props.programmer;
	if (props.assign) {
		return (
			<div className="article-preview">
				<div className="article-meta">
					<div className="info">
						With us from: {formatDate(programmer.createdAt)}
					</div>
				</div>

				<Link to={`/users/${programmer.idUser}`} className="preview-link">
					<h1>{programmer.firstName} "{programmer.nick}" {programmer.surname}</h1>
					<p>{programmer.mail}</p>
				</Link>
				{props.upgradable ? (
					<AssignToApp myProgrammers={props.upgradable} currentUser={props.currentUser} programmer={programmer} idApp={props.assign.idApp} onClick={props.onClick} />
				) : (
					<AssignToBug currentUser={props.currentUser} programmer={programmer} bug={props.assign} onClick={props.onClick} />
				)}
			</div>
		);
	}
	if (props.upgradable) {
		return (
			<div className="row">
				<div className='col-md-1' >
					{programmer.idUser}
				</div>
				<div className='col-md-1' >
					{programmer.firstName}
				</div>
				<div className='col-md-1' >
					{programmer.surname}
				</div>
				<div className='col-md-1' >
					{programmer.nick}
				</div>
				<div className='col-md-3' >
					{formatDate(programmer.createdAt)}
				</div>
				<div className='col-md-2' >
					{programmer.mail}
				</div>
				<div className='col-md-2' >
					{programmer.privilege === 1 || programmer.privilege === 4 ? (
						<Link onClick={() => { }} to={`/adminPanel`}>
							Ban
						</Link>
					) : programmer.privilege === 2 || programmer.privilege === 3 ? (
						<Link onClick={() => { }} to={`/adminPanel`}>
							Retirement
						</Link>
					) : (
						<Link onClick={() => { }} to={`/adminPanel`}>
							Unban
						</Link>)}
				</div>
				<div className='col-md-1' >
					{programmer.privilege === 1 || programmer.privilege === 2 ? (
						<Link onClick={() => { }} to={`/adminPanel`}>
							Promote
						</Link>
					) : null}
				</div>
			</div>
		);
	}
	return (
		<div className="article-preview">
			<div className="article-meta">
				<div className="info">
					With us from: {formatDate(programmer.createdAt)}
				</div>
			</div>

			<Link to={`/users/${programmer.idUser}`} className="preview-link">
				<h1>{programmer.firstName} "{programmer.nick}" {programmer.surname}</h1>
				<p>{programmer.mail}</p>
			</Link>
			{/* <EmeryturaButton currentUser={props.currentUser} programmer={programmer} /> */}
		</div>
	);
}

export default ProgrammerPreview;
// export default connect(mapStateToProps, mapDispatchToProps)(ProgrammerPreview);
