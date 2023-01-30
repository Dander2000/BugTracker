import React from 'react';
import agent from '../../agent';

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
						ev.preventDefault();
						props.onClickTag(tag, bug => agent.Bugs.byTag(bug.idBug), agent.Bugs.byTag(bug.idBug));
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

export default Tags;
