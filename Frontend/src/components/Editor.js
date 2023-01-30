// import ListErrors from './ListErrors';
// import React from 'react';
// import agent from '../agent';
// import { connect } from 'react-redux';
// import {
// 	ADD_TAG,
// 	EDITOR_PAGE_LOADED,
// 	REMOVE_TAG,
// 	ARTICLE_SUBMITTED,
// 	EDITOR_PAGE_UNLOADED,
// 	UPDATE_FIELD_EDITOR
// } from '../constants/actionTypes';

// const mapStateToProps = state => ({
// 	...state.editor,
// 	tags: state.home.tags,
// 	apps: state.appList.apps,
// 	currentUser: state.common.currentUser

// });

// const mapDispatchToProps = dispatch => ({
// 	onAddTag: () =>
// 		dispatch({ type: ADD_TAG }),
// 	onLoad: payload =>
// 		dispatch({ type: EDITOR_PAGE_LOADED, payload }),
// 	onRemoveTag: tag =>
// 		dispatch({ type: REMOVE_TAG, tag }),
// 	onSubmit: payload =>
// 		dispatch({ type: ARTICLE_SUBMITTED, payload }),
// 	onUnload: payload =>
// 		dispatch({ type: EDITOR_PAGE_UNLOADED }),
// 	onUpdateField: (key, value) =>
// 		dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
// });

// class Editor extends React.Component {
// 	constructor() {
// 		super();

// 		const updateFieldEvent =
// 			key => ev => this.props.onUpdateField(key, ev.target.value);
// 		this.changeTitle = updateFieldEvent('title');
// 		this.changeDescription = updateFieldEvent('description');
// 		this.changeBody = updateFieldEvent('body');
// 		this.changeTagInput = updateFieldEvent('tagInput');

// 		this.watchForEnter = ev => {
// 			if (ev.keyCode === 13) {
// 				ev.preventDefault();
// 				this.props.onAddTag();
// 			}
// 		};

// 		this.removeTagHandler = tag => () => {
// 			this.props.onRemoveTag(tag);
// 		};

// 		this.submitForm = ev => {
// 			ev.preventDefault();
// 			const article = {
// 				title: this.props.title,
// 				description: this.props.description,
// 				body: this.props.body,
// 				tagList: this.props.tagList
// 			};

// 			const slug = { slug: this.props.articleSlug };
// 			const promise = this.props.articleSlug ?
// 				agent.Articles.update(Object.assign(article, slug)) :
// 				agent.Articles.create(article);

// 			this.props.onSubmit(promise);
// 		};
// 	}

// 	componentWillReceiveProps(nextProps) {
// 		// if (this.props.match.params.slug !== nextProps.match.params.slug) {
// 		// 	if (nextProps.match.params.slug) {
// 		// 		this.props.onUnload();
// 		// 		return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
// 		// 	}
// 		// 	this.props.onLoad(null);
// 		// }
// 	}

// 	componentDidMount() {
// 		// if (this.props.match.params.slug) {
// 		// 	return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
// 		// }
// 		this.props.onLoad(Promise.all([
// 			agent.Tags.all(),
// 			agent.Apps.all()
// 		]));
// 	}

// 	componentWillUnmount() {
// 		this.props.onUnload();
// 	}

// 	render() {
// 		if (!this.props.tags || !this.props.apps) {
// 			return (
// 				<div className="editor-page">
// 					<div className="container page">
// 						<div className="row">
// 							<div className="col-md-10 offset-md-1 col-xs-12">
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			);
// 		}
// 		return (
// 			<div className="editor-page">
// 				<div className="container page">
// 					<div className="row">
// 						<div className="col-md-10 offset-md-1 col-xs-12">

// 							<ListErrors errors={this.props.errors}></ListErrors>

// 							<form>
// 								<fieldset>
// 									<fieldset className="form-group">
// 										<select className='form-control' name={'bugtype'}>
// 											<option value={-1}>-- App --</option>
// 											{this.props.apps.map(app => {
// 												return (
// 													<option value={app.idApp} title={app.description}>
// 														{app.name}
// 													</option>
// 												);
// 											})}
// 										</select>
// 									</fieldset>
// 									<fieldset className="form-group">
// 										<select className='form-control' name={'bugtype'}>
// 											<option value={-1}>-- Bug type -- </option>
// 											{this.props.tags.map(tag => {
// 												return (
// 													<option value={tag.idBug} title={tag.information}>
// 														{tag.title}
// 													</option>
// 												);
// 											})}
// 										</select>
// 									</fieldset>
// 									<fieldset className="form-group">
// 										<textarea
// 											className="form-control"
// 											rows="6"
// 											placeholder={"Details of bug"}
// 											value={""}
// 											onChange={this.changeDescription}>
// 										</textarea>
// 									</fieldset>
// 									<input
// 										className="form-control"
// 										type="text"
// 										value={this.props.currentUser.idUser}
// 										disabled={true}
// 										hidden={true}
// 									/>
// 									<input
// 										className="btn btn-lg pull-xs-right btn-primary"
// 										type="button"
// 										disabled={this.props.inProgress}
// 										value="Send bug to professionals"
// 										onClick={this.submitForm} />

// 								</fieldset>
// 							</form>

// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Editor);
