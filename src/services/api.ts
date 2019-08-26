import axios from "axios";
axios.defaults.headers.common[`X-Requested-With`] = `XMLHttpRequest`;
axios.defaults.headers.common[`Content-Type`] = `application/json charset=UTF-8`;
const apiUrl = 'http://api.mp3pam.loc';

const makeRequest = (url: string, verb: string, data = null) => {
	// axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`

	let request

	switch (verb) {
		case 'get':
			request = axios.get(url)
			break
		case 'post':
			request = axios.post(url, data)
			break
		case 'put':
			request = axios.put(url, data)
			break
		case 'delete':
			request = axios.delete(url)
			break
	}

	// request.catch((response: Response) => {
	// 		switch (response.status) {
	// 			case 400:
	// 				// login required
	// 				// this.events.publish('loginRequired');
	// 				break;
	// 			case 500:
	// 				// server error
	// 				console.log('server error');
	// 				return;
	// 		}

	// 		console.log(response.json())

	// 		let res = {
	// 			message: response.json().message,
	// 			status: response.status
	// 		};

	// 		return Observable.throw(res);
	// 	});
	return request;
}

// cosnt makeUrlFor = (resourceName, resourceId) => {
// 	let url;

// 	switch (resourceName) {
// 		case 'music':
// 			url = this.apiUrl + '/musics/' + resourceId;
// 			break;
// 		case 'category':
// 			url = this.apiUrl + '/categories/' + resourceId;
// 			break;
// 	}

// 	return url;
// }

const APIService = {
	getList: (listId: string) => {
		return makeRequest(`${apiUrl}/list/${listId}`, 'get');
	},
// 	getMusics: (url?) => {
// 	if (! url) {
// 		url = this.apiUrl + '/musics'
// 	}

// 	return this.makeRequest(url, 'get')
// },

// getMusic: (url) => {
// 	return this.makeRequest(url, 'get')
// },

// search: (term) => {
// 	let url = this.apiUrl + '/search?term=' + term
// 	return this.makeRequest(url, 'get')
// },

// // Categories
// getCategories: () => {
// 	let url = this.apiUrl + '/categories'
// 	return this.makeRequest(url, 'get')
// },

// getMusicsByCategory: (url) => {
// 	return this.makeRequest(url, 'get')
// },

// // Authentication
// getAuthToken: () => {
// 	return this.userToken
// },

// login: (credentials) => {
// 	let url = this.apiUrl + '/login'
// 	return this.makeRequest(url, 'post', credentials)
// },

// register: (credentials) => {
// 	let url = this.apiUrl + '/register'
// 	return this.makeRequest(url, 'post', credentials)
// },

// // Password Recovery
// recover: (credentials) => {
// 	let url = this.apiUrl + '/recover'
// 	return this.makeRequest(url, 'post', credentials)
// },

// verify: (credentials) => {
// 	let url = this.apiUrl + '/verify'
// 	return this.makeRequest(url, 'post', credentials)
// },

// changePassWord: (credentials) => {
// 	let url = this.apiUrl + '/reset-password'
// 	return this.makeRequest(url, 'post', credentials)
// },
}

export default APIService;