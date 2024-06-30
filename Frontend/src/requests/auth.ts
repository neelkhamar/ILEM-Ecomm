"use client";

import API from './server';

export const loginService = async (payload: any) => {
    let resp = await API.post('/login', payload);
    return resp;
}

export const registerService = async (payload: any) => {
    let resp = await API.post('/create/user', payload);
    return resp;
}

export const leftMenuService = async () => {
    let resp = await API.get('/left-menu');
    return resp;
}