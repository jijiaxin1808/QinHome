import { axiosB, axiosF } from "../utils/axios";


function login(data) {
    return axiosF("users/login",data,"POST");
}
function alterPwd(data) {
    return axiosB("users/alterPwd",data,"POST");
}
function tokenLogin() {
    return axiosB("users/tokenLogin");
}

export { login, alterPwd, tokenLogin };