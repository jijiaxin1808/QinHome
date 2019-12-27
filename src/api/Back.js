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
function logs() {
    return axiosB("logs");
}
function postsDelete(params) {
    const url = "posts/delete";
    const newUrl = spliceUrl(url,params)
    return axiosB(newUrl,null,"POST");
}
function logOut() {
    return axiosB("users/logout");
}
function modelUpdate(data) {
    return axiosB("options/update",data,"POST");
}
//  upload()  函数的参数到时候自己到文件里去配置
export { modelUpdate, logOut, postsDelete, logs, getPageInfo, messagesDelete, alterReadStatus, alter, login, alterPwd, tokenLogin, listMsgs, addReply, Msgdelete };