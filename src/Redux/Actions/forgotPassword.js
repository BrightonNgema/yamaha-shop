import {
    PASSWORD_FORGOT_REQUEST, PASSWORD_FORGOT_SUCCESS, PASSWORD_FORGOT_FAILED,
    PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILED,
    NULL_STATUS,
} from '../Const/forgotPassword';
import axios from 'axios';




export const getPasswordForgot = (body) => {
    return dispatch => {
        dispatch(password_forgot_request());
        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/password/create', body).then(
            resp => {
                dispatch(password_forgot_success(resp.data))
            }
        ).catch(error => {

            dispatch(password_forgot_failed(error))
        })
    }

}

function password_forgot_request() {
    return {
        type: PASSWORD_FORGOT_REQUEST
    }
}
function password_forgot_failed(data) {
    return {
        type: PASSWORD_FORGOT_FAILED,
        body: data
    }
}
function password_forgot_success(data) {
    return {
        type: PASSWORD_FORGOT_SUCCESS,
        body: data
    }
}

/**********************************PASSWORD RESET**********************************/
export const getPasswordReset = (body) => {
    return dispatch => {
        dispatch(password_reset_request());
        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/password/reset', body).then(
            resp => {
                dispatch(password_reset_success(resp.data))
            }
        ).catch(error => {

            dispatch(password_reset_failed(error))
        })
    }

}

function password_reset_request() {
    return {
        type: PASSWORD_RESET_REQUEST
    }
}
function password_reset_failed(data) {
    return {
        type: PASSWORD_RESET_FAILED,
        body: data
    }
}
function password_reset_success(data) {
    return {
        type: PASSWORD_RESET_SUCCESS,
        body: data
    }
}

// Null status
export function nullStatus() {
    return {
        type: NULL_STATUS
    }
}