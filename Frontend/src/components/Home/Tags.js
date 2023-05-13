import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	...state.home
});

const mapDispatchToProps = dispatch => ({
	// onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const Tags = props => {
	if (!props.tags) {
		return (
			<div>Loading Tags...</div>
		);
	}
	const tags = props.tags;
	return (
		<div className="tag-list">
			{
				tags.map(bug => {
					const handleClick = ev => {
						const tag = bug.title;
						const searchBar = props.searchBug ? props.searchBug : ' ';
						ev.preventDefault();
						props.onClickTag(tag, agent.Bugs.search(searchBar, bug.title, props.currentPage));
					};

					return (
						<a
							href=""
							className="tag-default tag-pill"
							key={bug.idBug}
							onClick={handleClick}
							title={bug.information}>
							{"type: " + bug.title}

						</a>
					);
				})
			}
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
// export default Tags;
