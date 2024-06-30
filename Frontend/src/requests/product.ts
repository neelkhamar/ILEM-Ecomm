"use client";

import { getQueryParams } from '@/utils/commonFunction';
import API from './server';

export const productService = async (params: any, userId: any) => {
    let url = getQueryParams(`/getProducts/${userId}`, params)
    let resp = await API.get(url);
    return resp;
}

export const cartInfo = async (userId: any) => {
    let resp = await API.get(`/cart/${userId}`);
    return resp;
}

export const addProductToCart = async (userId: any, payload: any) => {
    let resp = await API.post(`/cart/${userId}`, payload);
    return resp;
}

export const updateProductToCart = async (cartId: any, payload: any) => {
    let resp = await API.put(`/cart/${cartId}`, payload);
    return resp;
}