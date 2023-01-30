import ListErrors from './../ListErrors';
import React from 'react';

export default props => {
	if (!props.currentUser) {
		return null;
	}
	if (!props.user) {
		return null;
	}
	if (props.currentUser.idUser === props.user.idUser) {
		return (
			<div className="row">
				<h2>User settings</h2>
				<div className="col-md-10 offset-md-1 col-xs-12">
					<ListErrors errors={props.errors} />
					<form>
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
									placeholder='first name'
									value={props.user.firstName}
								/>
							</fieldset>
							<fieldset className="form-group">
								<input
									className="form-control"
									type="text"
									placeholder='surname'
									value={props.user.surname}
								/>
							</fieldset>
							<fieldset className="form-group">
								<input
									className="form-control"
									type="text"
									placeholder='mail'
									value={props.user.mail}
								/>
							</fieldset>
							<fieldset className="form-group">
								<input
									className="form-control"
									type="text"
									placeholder='nick'
									value={props.user.nick}
								/>
							</fieldset>
							<input
								className="btn btn-lg pull-xs-right btn-primary"
								type="button"
								disabled={props.inProgress}
								value="Save changes"
								onClick={props.submitForm} />
						</fieldset>
					</form>
				</div>
				<hr />
			</div>
		);
	}
	return null;
}