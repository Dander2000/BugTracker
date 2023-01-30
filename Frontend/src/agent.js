import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import md5 from 'md5';
const superagent = superagentPromise(_superagent, global.Promise);

// const API_ROOT = 'https://conduit.productionready.io/api';
const API_ROOT = 'http://localhost:4100';
// const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
	if (token) {
		req.set('authorization', `Token ${token}`);
	}//TODO
}

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
	all: () =>//props
		requests.get(`/apps`),//?${limit(10, page)}`),
	byAuthor: (author) =>
		requests.get(`/apps/programmer/${author}}`),
	get: id =>
		requests.get(`/apps/${id}`),
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
		requests.get(`/bugs?${limit(10, 0)}`),
	byAuthor: (author) =>
		requests.get(`/bugs/user/${author}`),
	byTag: (tag) =>
		requests.get(`/bugs/bugtype/${tag}`),
	byApp: (app) =>
		requests.get(`/bugs/app/${app}`),
	byProgrammer: (programmer) =>
		requests.get(`/bugs/programmer/${programmer}`),
	// edit: (idBug,details,appId,bugId) =>
	// 	requests.get(`/bugs/edit/${idBug}&${details}&${appId}&${bugId}`),
	finish: id =>
		requests.get(`/bugs/finish/${id}`),
	get: id =>
		requests.get(`/bugs/${id}`),
	search: (id, tag) =>
		requests.get(`/bugs/bugtype/${tag}&${id}`)
}

const Users = {
	all: () =>
		requests.get(`/users`),
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
		// requests.post(`/auth/login`, { user: { email, password } }),
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

// const omitSlug = article => Object.assign({}, article, { slug: undefined })
// const Articles = {
// 	all: page =>
// 		// requests.get(`/articles?${limit(10, page)}`),
// 		requests.get(`/apps`),
// 	byAuthor: (author, page) =>
// 		requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
// 	byTag: (tag, page) =>
// 		requests.get(`/apps?tag=${encode(tag)}&${limit(10, page)}`),
// 	del: slug =>
// 		requests.del(`/articles/${slug}`),
// 	favorite: slug =>
// 		requests.post(`/articles/${slug}/favorite`),
// 	favoritedBy: (author, page) =>
// 		requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
// 	feed: () =>
// 		// requests.get('/articles/feed?limit=10&offset=0'),
// 		requests.get(`/apps`),
// 	get: slug =>
// 		requests.get(`/articles/${slug}`),
// 	unfavorite: slug =>
// 		requests.del(`/articles/${slug}/favorite`),
// 	update: article =>
// 		requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
// 	create: article =>
// 		requests.post(`/articles`, { article })
// };

// const Comments = {
// 	create: (slug, comment) =>
// 		requests.post(`/articles/${slug}/comments`, { comment }),
// 	delete: (slug, commentId) =>
// 		requests.del(`/articles/${slug}/comments/${commentId}`),
// 	forArticle: slug =>
// 		requests.get(`/articles/${slug}/comments`)
// };

export default {
	Auth,
	Apps,
	Bugs,
	Tags,
	Users,
	setToken: _token => { token = _token; }
};
