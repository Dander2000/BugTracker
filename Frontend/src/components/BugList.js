import BugPreview from './BugPreview';
import React from 'react';
import ListPagination from './ListPagination';

const BugList = props => {
	if (!props.bugs) {
		return (
			<div className="article-preview">
				Loading...
			</div>

		);
	}
	if (props.bugs.length === 0) {
		return (
			<div className="article-preview">
				No bugs are here... yet.
			</div>
		);
	}
	return (
		<div>
			{
				props.bugs.map(bug => {
					return (
						<BugPreview bug={bug} key={bug.idBug} currentUser={props.currentUser} />
					)
				})
			}
			<ListPagination
				itemsCounter={props.bugsCount}
				pager={props.pager}
				currentPage={props.currentPage} />
		</div>

	);
};

export default BugList;