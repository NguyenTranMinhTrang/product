import axios from "axios";
import endpoint from "./endpoint";

const timeoutInSecond = 10;

const axiosInstance = axios.create({
    baseURL: endpoint.BASE_URL,
    timeout: timeoutInSecond * 1000
});

export default axiosInstance;