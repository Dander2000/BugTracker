import React from 'react';
import { Link } from 'react-router-dom';
import ProgrammerList from './ProgrammerList';
import agent from '../agent';

const ReportBug = props => {
	if (props.currentUser) {
		return (
			<Link to={`/bugs/create/${props.app.idApp}`} className="preview-link">
				Report a bug
			</Link>
		)
	}
	return null;
}

// const EditApp = props => {
// 	if (!props.currentUser) {
// 		return null;
// 	}
// 	if (props.currentUser.privilege === 3) {
// 		return (
// 			<Link to={`/apps/edit/${props.app.idApp}`} className="preview-link">
// 				TODO: Edytuj informacje o aplikacji
// 			</Link>
// 		)
// 	} else {
// 		return null;
// 	}
// }

const AppPreview = props => {
	if (!props.app) {
		return null;
	}
	if (props.upgradable) {
		return (
			<div className="article-preview">
				<div className="row">
					<div className='col-md-1' >
						Id App
					</div>
					<div className='col-md-1' >
						Name
					</div>
					<div className='col-md-3' >
						Description
					</div>
					<div className='col-md-2' >
						App State
					</div>
					<div className='col-md-5' >
						Programmers
					</div>
				</div>
				<hr />
				<div className="row">
					<div className='col-md-1' >
						{props.app.idApp}
					</div>
					<div className='col-md-1' >
						{props.app.name}
					</div>
					<div className='col-md-3' >
						{props.app.description}
					</div>
					<div className='col-md-1' >
						{props.app.appState}
					</div>
					<div className='col-md-1' >
						<Link onClick={() => { props.onUpgrade(agent.Apps.upgrade(props.app.idApp, props.app.appState), props.currentUser, '/adminPanel') }} to={'/adminPanel'}>
							Upgrade
						</Link><br />
						<Link onClick={() => { props.onDowngrade(agent.Apps.downgrade(props.app.idApp, props.app.appState), props.currentUser, '/adminPanel') }} to={'/adminPanel'}>
							Downgrade
						</Link>
					</div>
					{/* <div className='col-md-1' >
					<button>
						Edit
					</button>
				</div> */}
					<div className='col-md-5' >
						{/* <button onClick={Retirement}> */}
						<ProgrammerList programmers={props.programmers} currentUser={props.currentUser} assign={props.app} onClick={props.onClick} upgradable={props.upgradable} />
					</div>
					<hr />
				</div>
			</div>
		);
	}
	return (
		<div className="article-preview">
			<div className="article-meta">
				<div className="info">
					App status: {props.app.appState}
				</div>
			</div>
			{/* <EditApp currentUser={props.currentUser} app={props.app} /> */}
			<Link to={`/apps/${props.app.idApp}`} className="preview-link">
				<h1>{props.app.name}</h1>
				<p>{props.app.description}...<br /><span>Read more</span></p>
			</Link>
			<div>
				<ReportBug currentUser={props.currentUser} app={props.app} />
			</div>
		</div>
	);
}

export default AppPreview;
//export default connect(() => ({}), mapDispatchToProps)(AppPreview);
