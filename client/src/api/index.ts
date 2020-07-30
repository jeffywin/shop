import axios, {AxiosRequsetConfig} from 'axios';

axios.defaults.baseURL = 'http://localhost:8001/';
axios.defaults.headers.post['Content-type'] = 'application/json';
axios.interceptors.request.use(
    (config: AxiosRequsetConfig) => {
        let access_token = sessionStorage.getItem("access_token");
        config.headers = {
            Authorization: `Bearer ${access_token}`
        };
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    (response: any) => response.data,
    (error: any) => Promise.reject(error)
)

export default axios;
