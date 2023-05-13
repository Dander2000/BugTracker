import {
	HOME_PAGE_LOADED,
	HOME_PAGE_UNLOADED,
	APPLY_TAG_FILTER,
	CLEAR_TAG_FILTER,
	EDITOR_PAGE_LOADED,
	EDITOR_PAGE_UNLOADED,
	UPDATE_FIELD_HOME,
	SEARCH_BUG,
	SET_PAGE
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
				tag: action.tag,
				bugsCount: action.payload.counter[0].counter,
				currentPage: 0
			};
		case SEARCH_BUG:
			return {
				...state,
				tags: action.payload[0].bugtypes,
				bugsCount: action.payload[1].counter[0].counter,
				currentPage: 0
			}
		case CLEAR_TAG_FILTER:
			return {
				...state,
				bugsCount: action.payload.counter[0].counter,
				tag: action.tag,
				searchBug: '',
				currentPage: 0
			};
		case HOME_PAGE_LOADED:
			return {
				...state,
				tag: action.tag,
				tags: action.payload[0].bugtypes,
				// pager: // it's a payload
				bugsCount: action.payload[1].counter[0].counter,
				searchBug: '',
				currentPage: 0,

			};
		case UPDATE_FIELD_HOME:
			return { ...state, [action.key]: action.value };
		case SET_PAGE:
			return {
				...state,
				currentPage: action.page
			}
		case HOME_PAGE_UNLOADED:
		case EDITOR_PAGE_UNLOADED:
			return {};
		default:
			return state;
	}
};
