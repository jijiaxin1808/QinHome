import { axiosB, axiosF } from "../utils/axios";
import spliceUrl from "../utils/params";

function login(data) {
    return axiosF("users/login",data,"POST");
}
function alterPwd(data) {
    return axiosB("users/alterPwd",data,"POST");
}
function tokenLogin() {
    return axiosB("users/tokenLogin");
}
function listMsgs(params) {
    const url = "msgs/listMsgs";
    const newUrl = spliceUrl(url,params)
    return axiosB(newUrl);
}
function addReply(data) {
    return axiosB("msgs/addReply",data,"POST");
}
function Msgdelete(data) {
    return axiosB("msgs/delete",data,"POST");
}

export { login, alterPwd, tokenLogin, listMsgs, addReply, Msgdelete };