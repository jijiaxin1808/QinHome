/* eslint-disable linebreak-style */
export function isRepeat (arr) {
	var hash = {};
	for (var i in arr) {
		if (hash[arr[i]]) {
			return true;
		}
		hash[arr[i]] = true;
	}
	return false;
}
// eslint-disable-next-line linebreak-style
export function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
