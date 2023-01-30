import AppPreview from './AppPreview';
// import ListPagination from './ListPagination';
import React from 'react';

const AppList = props => {
	if (!props.apps) {
		return (
			<div className="article-preview">
				Loading...
			</div>
		);
	}

	if (props.apps.length === 0) {
		return (
			<div className="article-preview">
				No apps are here... yet.
			</div>
		);
	}
	return (
		<div className="article-preview">
			{
				props.apps.map(app => {
					return (
						<AppPreview
							app={app}
							key={app.idApp}
							currentUser={props.currentUser}
							upgradable={props.upgradable}
							programmers={props.programmers}
							onDowngrade={props.onDowngrade}
							onUpgrade={props.onUpgrade}
							onClick={props.onClick} />
					);
				})
			}
			{/* <ListPagination
				pager={props.pager}
				appsCount={props.appsCount}
				currentPage={props.currentPage} /> */}
		</div>
	);
};

export default AppList;