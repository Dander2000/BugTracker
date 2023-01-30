import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from "./../constants/actionTypes";

const LoggedOutView = props => {
	if (!props.currentUser) {
		return (
			<ul className="nav navbar-nav pull-xs-right">

				<li className="nav-item">
					<Link to="/" className="nav-link">
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/login" className="nav-link">
						Sign in
					</Link>
				</li>

				<li className="nav-item">
					<Link to="/register" className="nav-link">
						Sign up
					</Link>
				</li>

			</ul>
		);
	}
	return null;
};

const LoggedInView = props => {
	if (props.currentUser) {
		if (props.currentUser.privilege === 3) {
			return (
				<ul className="nav navbar-nav pull-xs-right">

					<li className="nav-item">
						<Link to="/" className="nav-link">
							Bug List
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/programmers" className="nav-link">
							Programmer List
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/apps" className="nav-link">
							App List
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/adminPanel" className="nav-link">
							<i className="ion-compose">
								Admin Pannel
							</i>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/bugs/create" className="nav-link">
							<i className="ion-compose">
								New Bug
							</i>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/apps/create" className="nav-link">
							<i className="ion-compose">
								New App
							</i>
						</Link>
					</li>
					<li className="nav-item">
						{/* <Link to="/settings" className="nav-link"> */}
						<Link to={"/users/" + props.currentUser.idUser} className="nav-link">
							<i className="ion-gear-a">
								Profile
							</i>
						</Link>
					</li>
					<li className="nav-item">
						<button
							className="btn btn-outline-danger"
							onClick={props.onClickLogout}>
							Logout
						</button>
					</li>
				</ul>
			);
		}
		return (
			<ul className="nav navbar-nav pull-xs-right">

				<li className="nav-item">
					<Link to="/" className="nav-link">
						Bug List
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/programmers" className="nav-link">
						Programmer List
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/apps" className="nav-link">
						App List
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/bugs/create" className="nav-link">
						<i className="ion-compose">
							New Bug
						</i>
					</Link>
				</li>

				<li className="nav-item">
					{/* <Link to="/settings" className="nav-link"> */}
					<Link to={"/users/" + props.currentUser.idUser} className="nav-link">
						<i className="ion-gear-a">
							Profile
						</i>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/">
						<button
							className="btn btn-outline-danger"
							onClick={props.onClickLogout}>
							Logout
						</button>
					</Link>
				</li>
			</ul>
		);
	}

	return null;
};

const mapStateToProps = state => ({
	...state,
	currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
	onClickLogout: () => ev => { dispatch({ type: LOGOUT }) }
});

class Header extends React.Component {

	render() {
		return (
			<nav className="navbar navbar-light">
				<div className="container">

					<Link to="/" className="navbar-brand">
						{this.props.appName.toUpperCase()}
					</Link>

					<LoggedOutView currentUser={this.props.currentUser} />

					<LoggedInView currentUser={this.props.currentUser} onClickLogout={this.props.onClickLogout()} />
				</div>
			</nav>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);