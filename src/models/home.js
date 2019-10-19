export default {
	namespace: "home",
	state: {
	},
	effects: {
	},
	reducers: {
		save(state,action) {
			return {
				...state,
				...action.payload
			};
		}
	}
};