import { login } from "../api/login";

export default {
	namespace: "login",
	state: [],
	subscriptions: {

	},
	effects: {
		*login({ payload }, { call, put }){
			console.log("effects",payload, call, put)
		}
	},
	reducers: {

	}
}
