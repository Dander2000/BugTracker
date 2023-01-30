import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
	...state,
	currentUser: state.common.currentUser

});
class Error404 extends React.Component {

	render() {
		if (!this.props.currentUser) {
			return (
				<Redirect to="/login" />
			);
		};
		return (
			<div className="banner">
				<div className="container">
					<h1 className="logo-font">
						Error: 404
					</h1>
					<p>Page not found</p>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, () => { })(Error404);
