import ListErrors from './../ListErrors';
import React from 'react';

export default props => {
	if (!props.user) {
		return null;
	}
	if (props.currentUser.idUser === props.user.idUser) {
		return (
			<div className="row">
				<h2>Change password</h2>
				<div className="col-md-10 offset-md-1 col-xs-12">
					<ListErrors errors={props.errors} />
					<fieldset>
						<fieldset className="form-group">
							<input
								className="form-control"
								type="text"
								value={props.user.idUser}
								disabled={true}
								hidden={true}
							/>
						</fieldset>
						<fieldset className="form-group">
							<input
								className="form-control"
								type="text"
								placeholder='old password'
								value={''}
							/>
						</fieldset>
						<fieldset className="form-group">
							<input
								className="form-control"
								type="text"
								placeholder='new password'
								value={''}
							/>
						</fieldset>
						<fieldset className="form-group">
							<input
								className="form-control"
								type="text"
								placeholder='repeat password'
								value={''}
							/>
						</fieldset>
						<input
							className="btn btn-lg pull-xs-right btn-primary"
							type="button"
							disabled={props.inProgress}
							value="Change password"
							onClick={props.submitForm} />
					</fieldset>
				</div>
			</div>
		);
	}
	return null;
}