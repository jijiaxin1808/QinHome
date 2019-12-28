// import { login } from "../api/login";
export default {
	namespace: "login",
	state: [],
	subscriptions: {

	},
	effects: {
		// *login({ payload }, { call, put }){
		// }
	},
	reducers: {
		init(state,action) {
			return {
				...state,
				...action.payload
			};
		}
	}
};
