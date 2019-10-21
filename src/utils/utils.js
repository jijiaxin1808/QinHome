export function isRepeat (arr) {
  var hash = {}
  for (var i in arr) {
    if (hash[arr[i]]) {
      return true
    }
    hash[arr[i]] = true
  }
  return false
}
export function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
