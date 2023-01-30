import { Link } from 'react-router-dom';
import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
	HOME_PAGE_LOADED,
	HOME_PAGE_UNLOADED,
	APPLY_TAG_FILTER,
	CLEAR_TAG_FILTER,
	SEARCH_BUG,
	UPDATE_FIELD_HOME
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
	...state.home,
	appName: state.common.appName,
	token: state.common.token,
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
	onSearch: (tag, payload) =>
		dispatch({ type: SEARCH_BUG, tag, payload }),
	onClearTag: (tag, payload) =>
		dispatch({ type: CLEAR_TAG_FILTER, tag, payload }),
	onClickTag: (tag, pager, payload) =>
		dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
	onLoad: (tag, pager, payload) =>
		dispatch({ type: HOME_PAGE_LOADED, tag, pager, payload }),
	onUnload: () =>
		dispatch({ type: HOME_PAGE_UNLOADED }),
	onUpdateField: (key, value) =>
		dispatch({ type: UPDATE_FIELD_HOME, key, value })
});

const ClearTags = props => {
	const clearHandler = ev => {
		// ev.preventDefault();
		props.onClearTag("all", agent.Bugs.all());
	}
	return (
		<button onClick={clearHandler} className={props.tag === "all" ? "btn-active" : null}>
			Clear filters
		</button>
	);
};

class Home extends React.Component {
	componentDidMount() {

		const updateFieldEvent =
			key => ev => {
				this.props.onUpdateField(key, ev.target.value)
			};
		this.onSearchChange = updateFieldEvent('searchBug');

		this.props.onLoad("all", agent.Bugs.all, Promise.all([
			agent.Tags.all(),
			agent.Bugs.all()
		]),);

		this.submitForm = ev => {
			// ev.persist();
			this.props.onSearch(this.props.tag, Promise.all([
				agent.Bugs.search(this.props.searchBug, this.props.tag),
				agent.Tags.all()
			]));
		}
	}

	componentWillUnmount() {
		this.props.onUnload();
	}
	render() {
		if (!this.props) {
			return (
				<div>Loading...</div>
			);
		}
		if (!this.props.currentUser) {
			return (
				<div className="home-page">
					<Banner
						appName={this.props.appName}
						onClick={this.submitForm}
						onChange={this.onSearchChange}
						value={this.props.search_bug} />
					{/* <div className="container page">
						<div className="row">
							<Link to="/login" className="nav-link">
								<button>
									Sign in
								</button>
							</Link>
							<Link to="/register" className="nav-link">
								<button>
									Sign up
								</button>
							</Link>
						</div>
					</div> */}
				</div>
			);
		}
		return (
			<div className="home-page">
				<Banner
					appName={this.props.appName}
					onClick={this.submitForm}
					onChange={this.onSearchChange}
					value={this.props.search_bug}
					currentUser={this.props.currentUser} />
				<div className="container page">
					<div className="row">
						<MainView currentUser={this.props.currentUser} />
						<div className="col-md-3">
							<div className="sidebar">
								<p>Popular Tags</p>
								<Tags
									tags={this.props.tags}
									onClickTag={this.props.onClickTag} /><br />
								<ClearTags
									tag={this.props.tag}
									onClearTag={this.props.onClearTag} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
