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
function alter(data) {
    return axiosB("posts/alter",data,"POST");
}
function alterReadStatus(data) {
    return axiosB("messages/alterReadStatus",data,"POST"); 
}
function messagesDelete(data) {
    return axiosB("messages/delete",data,"POST");
}
function getPageInfo() {
    return axiosB("messages/getPageInfo");
}


export { getPageInfo, messagesDelete, alterReadStatus, alter, login, alterPwd, tokenLogin, listMsgs, addReply, Msgdelete };