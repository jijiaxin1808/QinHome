const LOGIN_COOKIE_NAME = "sessionId";

export function isAuthenticated () {
	return _getCookie();
}

export function authenticateSuccess (token) {
	_setCookie(LOGIN_COOKIE_NAME, token);
}

export function logout () {
	_setCookie(LOGIN_COOKIE_NAME, "", 0);
}

function _getCookie () {
	if(localStorage.token){
	 return true;
	}else{
	 return false;
	}
}

export function _setCookie (token) {
	localStorage.setItem("token",token);
}