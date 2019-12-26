import axiosF from "../utils/axiosF";

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
    const { status, flag, limit, offset, category } = params;
    return axiosF(`posts/listPosts?status=${status}&flag=${flag}&limit=${limit}&offset=${offset}&category=${category}`)
}	
function get(params) {
    const { id } = params;
    return axiosF(`http://yjxt.elatis.cn/posts/get?id=${id}`)
}
// function searchTitle() {
//     const {}
// }





export {modelCloumn, modelCarousel, listModulePost, getArticle, modelTopicCol, modelSafe, modelBackground, listPosts, get  }
