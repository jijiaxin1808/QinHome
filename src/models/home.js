export default {
	namespace: "home",
	state: {
		TabData: []
	},
	effects: {

	},
	reducers: {
		save(state,action) {
			return {
				...state,
				...action.payload
			};
		},
		tabs(state,action) {
			return {
				...state,
				...action.payload
			};
		}
	}
};