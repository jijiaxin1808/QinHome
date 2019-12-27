import { axiosF } from "../utils/axios";
import spliceUrl from "../utils/params";

function modelCloumn() {
    return axiosF("options/name/column");
}
function modelCarousel() {
    return axiosF("options/name/carousel");
}
function listModulePost(data) {
    return axiosF("posts/listModulePost",data,"POST")
}
function getArticle(id) {
    return axiosF(`posts/get?id=${id}`)
}
function modelTopicCol() {
    return axiosF("options/name/topicCol");
}
function modelSafe() {
    return axiosF("options/name/safe");
}
function modelBackground() {
    return axiosF("options/name/background");
}
function listPosts(params) {
    const url = "posts/listPosts";
    const newUrl  = spliceUrl(url,params);
    return axiosF(newUrl)
}	
function get(params) {
    const url = "posts/get";
    const newUrl = spliceUrl(url,params)
    return axiosF(newUrl);
}
function listMsgs(params) {
    const url = "msgs/listMsgs";
    const newUrl = spliceUrl(url,params)
    return axiosF(newUrl);
}
function create(data) {
    return axiosF("msgs/create",data,"POST")
}







export {modelCloumn, modelCarousel, listModulePost, getArticle, modelTopicCol, modelSafe, modelBackground, listPosts, get,
    listMsgs, create
  }
