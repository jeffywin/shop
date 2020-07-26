import axios from './index';

export function validate() {
    return axios.get(`/user/validate`)
};

export function login<T>(values: T) {
    return axios.post<T, T>('/user/login', values);
}

export function register() {
    
}