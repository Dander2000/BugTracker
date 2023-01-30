import {
	APP_LOADED,
	APP_UNLOADED,
	ADMIN_PANEL_LOADED,
	ADMIN_PANEL_UNLOADED,
	PROGRAMMERS_LOADED,
	PROGRAMMERS_UNLOADED,
	PROGRAMMER_LOADED,
	PROGRAMMER_UNLOADED,
	// ASIGN_PROGRAMMER_TO_BUG,
	// ASIGN_PROGRAMMER_TO_APP,
	BUG_LOADED,
	BUG_UNLOADED,
	MY_APP_LOADED,
	MY_APP_UNLOADED,
	// EDIT_APP,
	// EDIT_BUG,
	// HOME_PAGE_LOADED//tag_programmer
} from '../constants/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case ADMIN_PANEL_LOADED:
			return {
				...state,
				users: action.payload[1].users,
				programmers: action.payload[2].users
			};
		case PROGRAMMER_LOADED:
			return {
				...state,
				user: action.payload[0].users
			};
		case APP_LOADED:
			return {
				...state,
				programmers: action.payload[1].programmers
			};
		case MY_APP_LOADED:
			// case ADMIN_PANEL_LOADED:
			let programmers = new Object();
			for (let i = 0; i < action.payload.length - 3; i++) {
				if (action.payload[i + 3].programmers) {
					programmers[action.ids[i]] = (action.payload[i + 3].programmers.length > 0) ? action.payload[i + 3].programmers : [];
				}
			}
			return {
				...state,
				users: action.payload[1].users,
				programmers: action.payload[2].users,
				myProgrammers: programmers
			};
		case BUG_LOADED:
			return {
				...state,
				programmers: action.payload[1].programmers
			};
		case PROGRAMMERS_LOADED:
			return {
				...state,
				programmerList: action.payload
			};
		case PROGRAMMERS_UNLOADED:
		case ADMIN_PANEL_UNLOADED:
		case BUG_UNLOADED:
		case APP_UNLOADED:
		case PROGRAMMER_UNLOADED:
		case MY_APP_UNLOADED:
			return {};
		default:
			return state;
	}
};
