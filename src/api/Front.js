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


// axios({
//     method:"POST",
//     url:"http://yjxt.elatis.cn/posts/listModulePost",
//     headers: {
//         "Content-Type":"application/json"
//     },
//     data: data1



export {modelCloumn, modelCarousel, listModulePost  }
