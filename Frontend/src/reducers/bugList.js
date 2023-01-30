import {
	HOME_PAGE_LOADED,
	HOME_PAGE_UNLOADED,
	APPLY_TAG_FILTER,
	CLEAR_TAG_FILTER,
	APP_LOADED,
	APP_UNLOADED,
	BUG_LOADED,
	BUG_UNLOADED,
	PROGRAMMER_LOADED,
	PROGRAMMER_UNLOADED,
	SEARCH_BUG,
} from '../constants/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case PROGRAMMER_LOADED:
			return {
				...state,
				bugs: action.payload[1].bugs,
				reports: action.payload[3].bugs
			};
		case PROGRAMMER_UNLOADED:
			return {};
		case APP_LOADED:
			return {
				...state,
				bugs: action.payload[2].bugs
			};
		case APP_UNLOADED:
			return {};
		case BUG_LOADED:
			return {
				...state,
				bug: action.payload[0].bugs[0]
			};
		case BUG_UNLOADED:
			return {};
		case APPLY_TAG_FILTER:
			return {
				...state,
				bugs: action.payload
			};
		case SEARCH_BUG:
			return {
				...state,
				bugs: action.payload[0]
			};
		case CLEAR_TAG_FILTER:
			return {
				...state,
				bugs: action.payload
			};
		case HOME_PAGE_LOADED:
			return {
				...state,
				bugs: action.payload[1]
			};
		case HOME_PAGE_UNLOADED:
			return {};
		default:
			return state;
	}
};
