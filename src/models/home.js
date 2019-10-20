export default {
	namespace: "home",
	state: {
		TabData: [],
		columnData: []
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