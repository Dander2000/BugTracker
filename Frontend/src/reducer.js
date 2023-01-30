import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

import appList from './reducers/appList';
import programmerList from './reducers/programmerList';
import bugList from './reducers/bugList';


export default combineReducers({
	appList,
	auth,
	bugList,
	common,
	editor,//TO SIMP
	home,//TO NAME CHANGE
	profile,//TO SIMP
	programmerList,
	settings,
	router: routerReducer
});
