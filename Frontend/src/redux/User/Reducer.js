import { SET_CURRENT_USER, SET_USER_LOGOUT, SET_CURRENT_PAGE, SET_CURRENT_MENU, SET_CURRENT_SEARCH } from "../Types";

const INIT_STATE = {
    currentUser: null,
    loggedIn: false,
    cart: 0,
    menuItems: [],
    searchKeyword: ''
};

const defaultState = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: Object.assign({}, state.currentUser, action.payload),
                loggedIn: true
            };

        case SET_USER_LOGOUT:
            localStorage.removeItem('persist:ecomm-reducer');
            return {
                ...state,
                currentUser: null,
                loggedIn: false,
                searchKeyword: "",
                cart: 0,
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                cart: action.payload
            };

        case SET_CURRENT_MENU:
            return {
                ...state,
                menuItems: action.payload
            };

        case SET_CURRENT_SEARCH:
            return {
                ...state,
                searchKeyword: action.payload
            };

        default:
            return state;
    }
};

export default defaultState;