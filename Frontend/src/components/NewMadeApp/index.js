import ListErrors from './../ListErrors';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
	EDITOR_PAGE_LOADED,
	ADD_APP,
	EDITOR_PAGE_UNLOADED,
	UPDATE_FIELD_EDITOR
} from '../../constants/actionTypes';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
	...state.editor,
	currentUser: state.common.currentUser

});

const mapDispatchToProps = dispatch => ({
	onLoad: payload =>
		dispatch({ type: EDITOR_PAGE_LOADED, payload }),
	onSubmit: payload =>
		dispatch({ type: ADD_APP, payload }),
	onUnload: () =>
		dispatch({ type: EDITOR_PAGE_UNLOADED }),
	onUpdateField: (key, value) =>
		dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class NewMadeApp extends React.Component {
	constructor() {
		super();

		const updateFieldEvent =
			key => ev => this.props.onUpdateField(key, ev.target.value);
		this.changeName = updateFieldEvent('name');
		this.changeDescription = updateFieldEvent('description');

		this.watchForEnter = ev => {
			if (ev.keyCode === 13) {
				ev.preventDefault();
				this.props.onSubmit();
			}
		};

		this.submitForm = ev => {
			ev.preventDefault();
			const name = this.props.name;
			const description = this.props.description;
			if (name && description) {
				this.props.onSubmit(agent.Apps.add(name, description));
			} else {
				console.log(name, description, 'nothin rly happends, but error will apear');
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
			<div className="editor-page">
				<div className="container page">
					<div className="row">
						<div className="col-md-10 offset-md-1 col-xs-12">
							<ListErrors errors={this.props.errors}></ListErrors>
							<form>
								<fieldset>
									<fieldset className={"form-group"}>
										<input
											className={'form-control'}
											name={'app_name'}
											placeholder={"Name of new app"}
											onChange={this.changeName} />
									</fieldset>
									<fieldset className="form-group">
										<textarea
											className={"form-control"}
											rows={"6"}
											placeholder={"Description of new app"}
											value={this.props.details}
											onChange={this.changeDescription}>
										</textarea>
									</fieldset>
									<input
										className={"btn btn-lg pull-xs-right btn-primary"}
										type={"button"}
										disabled={this.props.inProgress}
										value={"Add new app to list"}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewMadeApp);
