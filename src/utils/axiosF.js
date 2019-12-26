import axios from "axios";
import baseUrl from "../config/baseUrl";
function axiosF(url, data = null, method = "GET") {
    const data1 = JSON.stringify(data);
    return axios({
        url: `${baseUrl}${url}`,
        data: data1,
        method,
        headers: {
            "Content-Type":"application/json"
        }
    })
}


export default axiosF;