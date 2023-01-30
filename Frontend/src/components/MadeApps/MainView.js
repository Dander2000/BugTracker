import AppList from '../AppList';
import React from 'react';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

const mapStateToProps = state => ({
	...state.appList,
	token: state.common.token
});

const mapDispatchToProps = dispatch => ({
	onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
	if (!props.apps) {
		return (
			<div className="col-md-9">
				Loading...
			</div>
		);
	}
	return (
		<div className="col-md-9">
			<AppList
				pager={props.pager}
				apps={props.apps.apps}
				loading={props.loading}
				appsCount={props.appsCount}
				currentPage={props.currentPage}
				currentUser={props.currentUser}
			/>
		</div>

	);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
