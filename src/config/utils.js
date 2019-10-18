export function sliceObj(obj, keys) {
	return keys.reduce((result, key) => {
		if (obj.hasOwnProperty(key)) {
			result[key] = obj[key];
		}
		return result;
	}, {});
}