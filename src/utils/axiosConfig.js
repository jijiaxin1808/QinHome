/* eslint-disable linebreak-style */

export default {
	axiosOptions (config) {
		return {
			timeout: 30000,
			headers: config.token ? { token: "someway to get token" } : {},
			baseURL: "" // set request base url
		};
	}
};
