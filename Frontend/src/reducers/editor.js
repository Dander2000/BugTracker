import {
	ADD_BUG,
	ADD_APP,
	EDITOR_PAGE_LOADED,
	EDITOR_PAGE_UNLOADED,
	ASYNC_START,
	UPDATE_FIELD_EDITOR,
	DOWNGRADE_APP,
	UPGRADE_APP,
	ASSIGN_PROGRAMMER_TO_BUG,
	ASSIGN_PROGRAMMER_TO_APP
} from '../constants/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case EDITOR_PAGE_LOADED:
			return {
				...state,
			};
		case EDITOR_PAGE_UNLOADED:
			return {};
		case ADD_BUG:
		case ADD_APP:
			return {
				...state,
				inProgress: null,
				errors: action.error ? action.payload.errors : null
			};
		case ASYNC_START:
			if (action.subtype === ADD_BUG ||
				action.subtype === ADD_APP ||
				action.subtype === ASSIGN_PROGRAMMER_TO_BUG ||
				action.subtype === DOWNGRADE_APP ||
				action.subtype === UPGRADE_APP ||
				action.subtype === ASSIGN_PROGRAMMER_TO_BUG ||
				action.subtype === ASSIGN_PROGRAMMER_TO_APP) {
				return { ...state, inProgress: true };
			}
			break;
		case UPDATE_FIELD_EDITOR:
			return { ...state, [action.key]: action.value };
		default:
			return state;
	}

	return state;
};
