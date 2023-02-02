import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import md5 from 'md5';
const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:4100';
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
	if (token) {
		req.set('authorization', `Token ${token}`);
	}
}

// NEED TO USE PROPER FUNCTION TO SENDING DATA
const requests = {
	del: url =>
		superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
	get: url =>
		superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
	put: (url, body) =>
		superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const Apps = {
	add: (name, description) =>
		requests.get(`/apps/create/${name}&${description}`),
	assign: (appId, userId) =>
		requests.get(`/apps/assign/${appId}&${userId}`),
	all: () =>
		requests.get(`/apps`),//TODO List pagination
	byAuthor: (author) =>
		requests.get(`/apps/programmer/${author}}`),
	get: id =>
		requests.get(`/apps/${id}`),
	//TODO Connect with database
	// update: app =>
	// 	requests.get(`/apps/edit/${app.id}&${app.description}`),
	upgrade: (id, appState) =>
		requests.get(`/apps/upgrade/${id}&${appState}`),
	downgrade: (id, appState) =>
		requests.get(`/apps/downgrade/${id}&${appState}`),

}
const Bugs = {
	add: (details, appId, bugId, userId) =>
		requests.get(`/bugs/create/${details}&${appId}&${bugId}&${userId}`),
	assign: (bugId, userId) =>
		requests.get(`/bugs/assign/${bugId}&${userId}`),
	all: () =>
		requests.get(`/bugs?${limit(10, 0)}`),//TODO List pagination
	byAuthor: (author) =>
		requests.get(`/bugs/user/${author}`),//TODO List pagination
	byTag: (tag) =>
		requests.get(`/bugs/bugtype/${tag}`),//TODO List pagination
	byApp: (app) =>
		requests.get(`/bugs/app/${app}`),//TODO List pagination
	byProgrammer: (programmer) =>
		requests.get(`/bugs/programmer/${programmer}`),//TODO List pagination
	//TODO Connect with database
	// edit: (idBug,details,appId,bugId) =>
	// 	requests.get(`/bugs/edit/${idBug}&${details}&${appId}&${bugId}`),
	finish: id =>
		requests.get(`/bugs/finish/${id}`),
	get: id =>
		requests.get(`/bugs/${id}`),
	search: (id, tag) =>
		requests.get(`/bugs/bugtype/${tag}&${id}`)//TODO List pagination
}

const Users = {
	all: () =>
		requests.get(`/users`),//TODO List pagination
	admin: () =>
		requests.get(`/users/admin`),
	get: id =>
		requests.get(`/users/${id}`),
	specific: params => {
		const ids = params.join(`&`);
		return requests.get(`/users/${ids}`);
	},
	bugProgrammers: bug =>
		requests.get(`/users/bug/${bug}`),
	appProgrammers: app =>
		requests.get(`/users/programmer/${app}`),
	programmers: () =>
		requests.get(`/users/programmer`),
	//TODO Connect with database
	// resetpass: (mail,pass) =>{
	// password = md5(password);
	// return requests.get(`/users/resetpass/${mail}&${pass}`);},
	// upgrade: id =>
	// password = md5(password);
	// 	requests.get(`/users/upgrade/${id}`),
}

const Auth = {
	current: () =>
		requests.post(`/auth`),
	profile: username =>
		requests.get(`/auth/${username}`),
	login: (mail, password) => {
		password = md5(password);
		return requests.get(`/auth/login/${mail}&${password}`);
	},
	register: (firstName, surname, nick, mail, password) => {
		password = md5(password);
		if (!nick) {
			return requests.get(`/auth/register/${firstName}&${surname}&${mail}&${password}`);
		}
		return requests.get(`/auth/register/${firstName}&${surname}&${mail}&${password}&${nick}`) //{ user: { username, email, password } }),
	},
	save: user =>
		requests.put(`/auth`, { user })
};

const Tags = {
	all: () => requests.get(`/bugtypes`)
};

export default {
	Auth,
	Apps,
	Bugs,
	Tags,
	Users,
	setToken: _token => { token = _token; }
};
