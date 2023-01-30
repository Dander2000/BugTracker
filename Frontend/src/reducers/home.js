import {
	HOME_PAGE_LOADED,
	HOME_PAGE_UNLOADED,
	APPLY_TAG_FILTER,
	CLEAR_TAG_FILTER,
	EDITOR_PAGE_LOADED,
	EDITOR_PAGE_UNLOADED,
	UPDATE_FIELD_HOME,
	SEARCH_BUG
} from '../constants/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case EDITOR_PAGE_LOADED:
			return {
				...state,
				tags: action.payload[0].bugtypes
			};
		case APPLY_TAG_FILTER:
			return {
				...state,
				tag: action.tag
			};
		case SEARCH_BUG:
			return {
				...state,
				tags: action.payload[1].bugtypes
			}
		case CLEAR_TAG_FILTER:
			return {
				...state,
				tag: action.tag
			};
		case HOME_PAGE_LOADED:
			return {
				...state,
				tag: action.tag,
				tags: action.payload[0].bugtypes
			};
		case UPDATE_FIELD_HOME:
			return { ...state, [action.key]: action.value };
		case HOME_PAGE_UNLOADED:
		case EDITOR_PAGE_UNLOADED:
			return {};
		default:
			return state;
	}
};
