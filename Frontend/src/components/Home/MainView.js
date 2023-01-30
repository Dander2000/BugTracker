import BugList from '../BugList';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	...state.home,
	bugs: state.bugList.bugs
});

const mapDispatchToProps = dispatch => ({
	// onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
	if (!props.bugs) {
		return (
			<div className="col-md-9">
				Loading...
			</div>
		);
	}
	return (
		<div className="col-md-9">
			<BugList
				pager={props.pager}
				bugs={props.bugs.bugs}
				loading={props.loading}
				bugsCount={props.bugsCount}
				currentPage={props.currentPage}
				currentUser={props.currentUser} />
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
