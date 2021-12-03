import { login } from '../Actions/auth'
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,

    USER_NO_AUTH,
    NULL_STATUS,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REQUEST,

    REGISTER_USER_REQUEST,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS,


} from '../Const/auth'
import { errorConfig } from '../service'


const initialState = {
    loggedIn: false,
    error: null,
    status: null,
    message: null,
    loadingState: false,
    showSuccess:false,
    user: {
        email: "",
        name: "",
        surname: "",
        phone: "",
        default_address: "",
    },
}

export function authReducer(state = initialState, action) {
    let data = null;
    switch (action.type) {
        // Login requests

        case LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true
            })
        case LOGIN_USER_SUCCESS:
            sessionStorage.setItem("token", action.body.access_token);
            if(!localStorage.getItem('cart_id')){
                localStorage.setItem('cart_id', action.body.data.uuid)
            }
            return Object.assign({}, state, {
                status: "success",
                loadingState: false,

            })
        case LOGIN_USER_FAILED:
            data=errorConfig(action.body)
            return Object.assign({}, state, {
                status: "error",
                loadingState: false,
                ...data
            })

        // register requests
        case REGISTER_USER_REQUEST:
            return Object.assign({}, state,
                {
                    status: "pending",
                    loadingState: true
                })
        case REGISTER_USER_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                message: action.body.message,
                loadingState: false,
            })
        case REGISTER_USER_FAILED:
            data = errorConfig(action.body)
           
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                
                loadingState: false
            })
        // getUser requests
        case GET_USER_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true
            })
        case GET_USER_SUCCESS:
            sessionStorage.setItem('user_id', action.body.data.id)
            return Object.assign({}, state, {
                status: "success",
                loggedIn: true,
                user: action.body.data,
                loadingState: false,
            })
        case GET_USER_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loadingState: false,

            })

        case USER_NO_AUTH:
            return Object.assign({}, state, {
                loggedIn: false,
                status: null,
                loadingState: false
            })
        case NULL_STATUS:
        
            return Object.assign({}, state, {

                status: null,

            })
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: false
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                status: null,
                message: null,
                error: null,
                loadingState: false,
                loggedIn: false,
                user: {}
            })
        case LOGOUT_FAILED:
            return Object.assign({}, state, {
                status: "errors",
                loadingState: false
            })

        default:
            return state;
    }
}
