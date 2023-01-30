import {
	APP_LOAD,
	REDIRECT,
	LOGOUT,
	ADD_BUG,
	ADD_APP,
	SETTINGS_SAVED,
	LOGIN,
	REGISTER,
	EDITOR_PAGE_UNLOADED,
	HOME_PAGE_UNLOADED,
	PROFILE_PAGE_UNLOADED,
	ASSIGN_PROGRAMMER_TO_BUG,
	ASSIGN_PROGRAMMER_TO_APP,
	DOWNGRADE_APP,
	UPGRADE_APP,
	FINISH_TASK,
	SETTINGS_PAGE_UNLOADED,
	LOGIN_PAGE_UNLOADED,
	REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const defaultState = {
	appName: 'Bug Tracker',
	token: null,
	viewChangeCounter: 0
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case APP_LOAD:
			return {
				...state,
				token: action.token || null,
				appLoaded: true,
				currentUser: action.payload ? action.payload.users : null
			};
		case REDIRECT:
			return { ...state, redirectTo: null };
		case LOGOUT:
			return { ...state, redirectTo: '/', token: null, currentUser: null };
		case ADD_BUG:
		case ADD_APP:
		case FINISH_TASK:
			return { ...state, redirectTo: '/' };
		case SETTINGS_SAVED:
			return {
				...state,
				redirectTo: action.error ? null : '/'
			};
		case ASSIGN_PROGRAMMER_TO_BUG:
		case DOWNGRADE_APP:
		case UPGRADE_APP:
		case ASSIGN_PROGRAMMER_TO_APP:
			return {
				...state,
				redirectTo: action.error ? null : action.redirectTo,
				token: action.error ? null : action.payload.token,
				currentUser: action.currentUser
			};
		case LOGIN:
		case REGISTER:
			return {
				...state,
				redirectTo: action.error ? null : '/',
				token: action.error ? null : action.payload.token,
				currentUser: action.error ? null : action.payload.user
			};
		case EDITOR_PAGE_UNLOADED:
		case HOME_PAGE_UNLOADED:
		case PROFILE_PAGE_UNLOADED:
		case SETTINGS_PAGE_UNLOADED:
		case LOGIN_PAGE_UNLOADED:
		case REGISTER_PAGE_UNLOADED:
			return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
		default:
			return state;
	}
};
