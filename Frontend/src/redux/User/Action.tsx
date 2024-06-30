import { SET_CURRENT_USER, SET_USER_LOGOUT, SET_CURRENT_PAGE, SET_CURRENT_MENU, SET_CURRENT_SEARCH } from "../Types";

export const setCurrentUser = (payload: any) => {
    return {
        type: SET_CURRENT_USER,
        payload,
    };
};

export const logout = () => {
    return {
        type: SET_USER_LOGOUT,
    };
};

export const setCart = (payload: any) => {
    return {
        type: SET_CURRENT_PAGE,
        payload
    }
}

export const setMenu = (payload: any) => {
    return {
        type: SET_CURRENT_MENU,
        payload
    }
}

export const setSearch = (payload: any) => {
    return {
        type: SET_CURRENT_SEARCH,
        payload
    }
}