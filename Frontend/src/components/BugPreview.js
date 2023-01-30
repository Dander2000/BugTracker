import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from "./../formatDate.js";
import { connect } from 'react-redux';

const ProgressingBy = props => {
	if (props.bug.ProgressingBy) {
		return (
			<div className="info">
				ProgressingBy:
				<Link to={`users/${props.bug.ProgressingBy}`}>
					{props.bug.programmerNick ? ` ` + props.bug.programmerNick : `""`}
				</Link>
			</div>
		);
	}
	return (
		<div className="info">
			ProgressingBy: ""
		</div>
	);
}

const EditBug = props => {
	if (!props.currenUser) {
		return null;
		// }
		// if (props.currenUser.privilege === 3) {
		// 	return (
		// 		<div>
		// 			TODO: Popraw informacje odnośnie zadania
		// 		</div>
		// 	);
		// }
		// if (props.currenUser.privilege === 2 && props.currenUser.idUser === props.bug.ProgressingBy) {
		// 	return (
		// 		<div>
		// 			TODO: Popraw informacje odnośnie zadania
		// 		</div>
		// 	);
		// }
		// if (props.currenUser.idUser === props.bug.createdBy) {
		// 	return (
		// 		<div>
		// 			TODO: Popraw informacje odnośnie zadania
		// 		</div>
		// 	);
		// } else {
		// 	return null;
	}
}

const mapStateToProps = state => ({
	...state.bugList,
	currentUser: state.common.currentUser,
	programmers: state.programmerList.programmers,
	link: state.router.location.pathname
});

const BugPreview = props => {
	const bug = props.bug;

	return (
		<div className="article-preview">
			<Link to={`/bugs/${bug.idBug}`} className="preview-link">
				<h1>BUG: {('000000' + bug.idBug).slice(-6)}</h1>
				<div className="info">
					Details: {bug.details}
				</div>

				<div>
					<div className="info">
						Type: {bug.title}
					</div>
					<div className="info">
						Reported at: {formatDate(bug.bugCreatedAt)}
					</div>
					<span>Read more...</span><br />
				</div>
			</Link>
			<ProgressingBy link={props.link} bug={bug} />
			<EditBug bug={bug} currenUser={props.currenUser} />



		</div>
	);
}

export default connect(mapStateToProps, () => ({}))(BugPreview);
