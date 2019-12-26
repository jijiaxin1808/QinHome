import axios from "axios";
import baseUrl from "../config/baseUrl";
function axiosF(url, data = null, method = "GET") {
    return axios({
        url: `${baseUrl}${url}`,
        data: data,
        method
    })
}


export default axiosF;