import {
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

} from '../Const/auth';
import axios from 'axios';
import { config } from '../service';
import { getUser } from './user';

// Login actions
export const login = (body) => {
    let uuid=localStorage.getItem("cart_id");
    if(uuid){
        body.uuid=uuid
    }
    return dispatch => {
        dispatch(login_request());
        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/login', body).then(
            succ => {
                dispatch(login_success(succ.data))
                dispatch(getUser());
            }
        ).catch(
            error => {
                dispatch(login_failed(error))
            }
        )
    }
}

function login_request() {

    return {
        type: LOGIN_USER_REQUEST,
    }
}
function login_success(body) {
    return {
        type: LOGIN_USER_SUCCESS,
        body: body
    }
}
function login_failed(body) {
    return {
        type: LOGIN_USER_FAILED,
        body: body
    }
}

// Logout Actions
export function logoutAction() {
    let token = sessionStorage.getItem("token")

    return dispatch => {
        dispatch(logout_request())
        axios.get(process.env.REACT_APP_BACKEND_URL + 'auth/logout', config(token)).then(
            succ => {
                dispatch(logout_success())
                sessionStorage.removeItem("token")
            }
        ).catch(err => {
            dispatch(logout_failed(err))
        })
    }
}

function logout_request() {
    return {
        type: LOGOUT_REQUEST
    }
}
function logout_success() {
    return {
        type: LOGOUT_SUCCESS
    }
}
function logout_failed() {
    return {
        type: LOGOUT_FAILED
    }
}

// Null status
export function null_status() {
    return {
        type: NULL_STATUS
    }
}

export function no_auth() {
    return {
        type: USER_NO_AUTH
    }
}

// Register actions
export const register = (body) => {
    return dispatch => {
        dispatch(register_request(body));
        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/signup', body).then(
            resp => {

                dispatch(register_success(resp.data))
            }
        ).catch(error => {

            dispatch(register_failed(error))
        })
    }

}
function register_request(body) {
    return {
        type: REGISTER_USER_REQUEST,
        body: body
    }
}
function register_failed(body) {
    return {
        type: REGISTER_USER_FAILED,
        body: body
    }
}
function register_success(body) {
    return {
        type: REGISTER_USER_SUCCESS,
        body: body
    }
}

