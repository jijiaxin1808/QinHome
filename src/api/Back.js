import { axiosB, axiosF } from "../utils/axios";


function login(data) {
    return axiosF("users/login",data,"POST");
}


export { login }
