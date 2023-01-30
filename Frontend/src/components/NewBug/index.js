import ListErrors from './../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { validate } from "./validate";
import {
	EDITOR_PAGE_LOADED,
	ADD_BUG,
	EDITOR_PAGE_UNLOADED,
	UPDATE_FIELD_EDITOR,
	ERROR
} from '../../constants/actionTypes';
import { Redirect } from 'react-router-dom';

const SelectApp = props => {
	if (props.idApp === undefined) {
		return (
			<fieldset className="form-group">
				<select
					className='form-control'
					name='bugtype'
					onChange={props.onChange}>
					<option value={-1}>-- App --</option>
					{props.apps.map(app => {
						return (
							<option value={app.idApp} title={app.description} key={app.idApp}>
								{app.name}
							</option>
						);
					})}
				</select>
			</fieldset>
		);
	}
	return (
		<fieldset className="form-group">
			<select
				className='form-control'
				name={'bugtype'}
				disabled={true}
				onChange={props.onChange}>

				{props.apps.map(app => {
					if (app.idApp === parseInt(props.idApp, 10)) {
						return (
							<option value={app.idApp} title={app.description} key={app.idApp}>
								{app.name}
							</option>

						);
					}
					return null;
				})}

			</select>
		</fieldset>
	);

}

const mapStateToProps = state => ({
	...state.editor,
	tags: state.home.tags,
	apps: state.appList.apps,
	errors: state.auth.errors,
	currentUser: state.common.currentUser

});

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
		dispatch({ type: EDITOR_PAGE_LOADED, payload }),
	onSubmit: payload =>
		dispatch({ type: ADD_BUG, payload }),
	onUnload: () =>
		dispatch({ type: EDITOR_PAGE_UNLOADED }),
	onUpdateField: (key, value) =>
		dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
	onFailed: error =>
		dispatch({ type: ERROR, error })
});

// const validate = (p1, p2, p3) => {

// 	let errors = [];
// 	if (!p1) errors.push('App is required');
// 	if (!p2) errors.push('Bug type is required');
// 	if (!p3) errors.push('Description of bug is required');

// 	return errors;
// }

class NewBug extends React.Component {
	constructor() {
		super();

		const updateFieldEvent =
			key => ev => this.props.onUpdateField(key, ev.target.value);
		this.changeApp = updateFieldEvent('appId');
		this.changeBugtype = updateFieldEvent('bugId');
		this.changeDetails = updateFieldEvent('details');

		this.watchForEnter = ev => {
			if (ev.keyCode === 13) {
				ev.preventDefault();
				this.props.onSubmit();
			}
		};

		this.submitForm = ev => {
			let errors = [];
			ev.preventDefault();
			const details = this.props.details;
			const appId = this.props.appId;
			const bugId = this.props.bugId;
			const userId = this.props.currentUser.idUser;

			errors.push(...validate(appId, bugId, details));

			if (errors.length === 0) {
				const promise = agent.Bugs.add(details, appId, bugId, userId);
				this.props.onSubmit(promise);
			} else {
				this.props.onFailed(errors);
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		// if (this.props.match.params.slug !== nextProps.match.params.slug) {
		// 	if (nextProps.match.params.slug) {
		// 		this.props.onUnload();
		// 		return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
		// 	}
		// 	this.props.onLoad(null);
		// }
	}

	componentDidMount() {
		// const appList = this.props.common.currentUser ? agent.Apps.get(this.props.match.params.idApp) : agent.Apps.all() ;
		this.props.onLoad(Promise.all([
			agent.Tags.all(),
			agent.Apps.all()//appList
		]));
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
		if (!this.props.tags || !this.props.apps) {
			return (
				<div className="editor-page">
					<div className="container page">
						<div className="row">
							<div className="col-md-10 offset-md-1 col-xs-12">
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="editor-page">
				<div className="container page">
					<div className="row">
						<div className="col-md-10 offset-md-1 col-xs-12">
							<ListErrors errors={this.props.errors}></ListErrors>
							<form>
								<fieldset>
									<SelectApp idApp={this.props.match.params.idApp} apps={this.props.apps} onChange={this.changeApp} />
									<fieldset className="form-group">
										<select
											className={'form-control'}
											name={'bugtype'}
											onChange={this.changeBugtype}>
											<option value={-1}>-- Bug type --</option>
											{this.props.tags.map(tag => {
												return (
													<option value={tag.idBug} title={tag.information} key={tag.idBug}>
														{tag.title}
													</option>
												);
											})}
										</select>
									</fieldset>
									<fieldset className="form-group">
										<textarea
											className="form-control"
											rows="6"
											placeholder={"Details of bug"}
											value={this.props.details}
											onChange={this.changeDetails}>
										</textarea>
									</fieldset>
									<input
										className="btn btn-lg pull-xs-right btn-primary"
										type="button"
										disabled={this.props.inProgress}
										value="Send bug to professionals"
										onClick={this.submitForm} />

								</fieldset>
							</form>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBug);
