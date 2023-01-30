import ProgrammerPreview from './ProgrammerPreview';
import React from 'react';

const ProgrammerList = props => {
	if (!props.programmers) {
		return (
			<div className="article-preview">Loading...</div>

		);
	}

	if (props.programmers.length === 0) {
		return (
			<div>
				No programmers are here... yet.
			</div>
		);
	}
	console.log(props);
	return (
		<div className="col-md-12">
			{(props.upgradable && !props.assign) ? (
				<div className="row">
					{/* <div className="article-preview"> */}
					<div className='col-md-1' >
						User id
					</div>
					<div className='col-md-1' >
						Forename
					</div>
					<div className='col-md-1' >
						Surname
					</div>
					<div className='col-md-1' >
						Nick
					</div>
					<div className='col-md-3' >
						Created at
					</div>
					<div className='col-md-2' >
						Mail
					</div>
					<div className='col-md-3' >
						Managment
					</div>
					<hr />
				</div>
			) : null}
			{
				props.programmers.map(programmer => {
					return (
						<ProgrammerPreview
							programmer={programmer}
							key={programmer.User_idUser}
							currentUser={props.currentUser}
							assign={props.assign}
							upgradable={props.upgradable}
							onClick={props.onClick} />
					)
				})
			}
		</div>
	);
};

export default ProgrammerList;
