import {
	APPS_LOADED,
	APPS_UNLOADED,
	APP_LOADED,
	APP_UNLOADED,
	PROGRAMMER_LOADED,
	PROGRAMMER_UNLOADED,
	EDITOR_PAGE_LOADED,
	EDITOR_PAGE_UNLOADED,
	ADMIN_PANEL_LOADED,
	ADMIN_PANEL_UNLOADED,
	MY_APP_LOADED
} from '../constants/actionTypes';


export default (state = {}, action) => {
	switch (action.type) {
		case ADMIN_PANEL_LOADED:
		case MY_APP_LOADED:
			return {
				...state,
				apps: action.payload[0].apps
			};
		case EDITOR_PAGE_LOADED:
			return {
				...state,
				apps: action.payload[1].apps
			};
		case PROGRAMMER_LOADED:
			return {
				...state,
				apps: action.payload[2].programmers
			};
		case APP_LOADED:
			return {
				...state,
				app: action.payload[0].apps[0]
			};
		case APPS_LOADED:
			return {
				...state,
				apps: action.payload
			};
		case APP_UNLOADED:
		case ADMIN_PANEL_UNLOADED:
		case PROGRAMMER_UNLOADED:
		case APPS_UNLOADED:
		case EDITOR_PAGE_UNLOADED:
			return {};
		default:
			return state;
	}
};
