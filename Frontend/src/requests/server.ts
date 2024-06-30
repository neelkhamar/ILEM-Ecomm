"use client";

import axios from 'axios';

let baseURL = 'https://ilem-ecomm.onrender.com';
const API = {
    get: async (url: any) => {
        let result = await axios.get(baseURL + url);
        return result;
    },
    post: async (url: any, payload: any) => {
        let result = await axios.post(baseURL + url, payload);
        return result;
    },
    put: async (url: any, payload: any) => {
        let result = await axios.put(baseURL + url, payload);
        return result;
    },
    delete: async (url: any) => {
        let result = await axios.delete(baseURL + url);
        return result;
    }
}

export default API