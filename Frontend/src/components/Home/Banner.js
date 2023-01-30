import React from 'react';

const Search = ({ onClick, onChange, value }) => {
	return (
		<form>
			<fieldset>
				<input
					className='form-control'
					type='text'
					name='searchBug'
					placeholder='What bug you loking for?'
					value={value}
					onChange={onChange}
				/>
				<input
					className="btn btn-lg pull-xs-right btn-primary"
					type="button"
					value="Search bug"
					onClick={onClick} />
			</fieldset>
		</form>

	);
}

const Banner = ({ appName, onClick, onChange, value, currentUser }) => {
	if (!currentUser) {
		return (
			<div className="banner">
				<div className="container">
					<h1 className="logo-font">
						{appName.toUpperCase()}
					</h1>
					<p>A place to solve your technical problems.</p>
				</div>
			</div>
		);
	}
	return (
		<div className="banner">
			<div className="container">
				<h1 className="logo-font">
					{appName.toUpperCase()}
				</h1>
				<p>A place to solve your technical problems.</p>
				<Search onClick={onClick} onChange={onChange} value={value} />
			</div>
		</div>
	);
};

export default Banner;
