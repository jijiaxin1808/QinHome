// const LOGIN_COOKIE_NAME = "localId";

export function isAuthenticated () {
	return _getCookie();
}

// export function authenticateSuccess (token) {
// 	setCookie(LOGIN_COOKIE_NAME, token);
// }

// export function logout () {
// 	_setCookie(LOGIN_COOKIE_NAME, "", 0);
// }
export function getCookie () {
	return localStorage.getItem("token");
}

function _getCookie () {
	if(localStorage.token){
	 return true;
	}else{
	 return false;
	}
}

export function setCookie (token) {
	localStorage.setItem("token",token);
}