import {
    GET_ALL_RETURN_PRODUCTS_SUCCESS,
    GET_ALL_RETURN_PRODUCTS_PENDING,
    GET_ALL_RETURN_PRODUCTS_FAILED,
    REQUEST_RETURNS_SUCCESS,
    REQUEST_RETURNS_PENDING,
    REQUEST_RETURNS_FAILED,
    SEND_AUTH_PENDING,
    SEND_AUTH_SUCCESS,
    SEND_AUTH_FAILED,
    GET_RETURN_SUMMARY_SUCCESS,
    GET_RETURN_SUMMARY_PENDING,
    GET_RETURN_SUMMARY_FAILED,
    SEND_RETURN_SUMMARY_SUCCESS,
    SEND_RETURN_SUMMARY_PENDING,
    SEND_RETURN_SUMMARY_FAILED,
    NULL_STATUS,
} from "../Const/returns";

import axios from 'axios';
import { config } from '../service';

function get_product_return_success(body) {
    //console.log(body)
    return {
        type: GET_ALL_RETURN_PRODUCTS_SUCCESS,
        body: body
    }
}
function get_product_return_failed(body) {
    return {
        type: GET_ALL_RETURN_PRODUCTS_FAILED,
        body: body
    }
}
function get_product_return_pending() {
    return {
        type: GET_ALL_RETURN_PRODUCTS_PENDING
    }
}

export const getReturnProducts = (id) => {
    let token = sessionStorage.getItem("token")
    return dispatch => {
        if (token) {
            dispatch(get_product_return_pending())
            axios.get(`${process.env.REACT_APP_BACKEND_URL}orders/${id}/returns`, config(token)).then(succ => {
                //console.log("returns", succ)
                dispatch(get_product_return_success(succ.data.data))
            }).catch(error => {
                dispatch(get_product_return_failed(error))
            })
        }
    }
}


function request_return_success(body) {
    //console.log(body)
    return {
        type: REQUEST_RETURNS_SUCCESS,
        body: body
    }
}
function request_return_failed(body) {
    return {
        type: REQUEST_RETURNS_FAILED,
        body: body
    }
}
function request_return_pending() {
    return {
        type: REQUEST_RETURNS_PENDING
    }
}

export const requestReturn = (id, body) => {
    let token = sessionStorage.getItem("token")
    //console.log("action return request", body);
    return dispatch => {
        if (token) {
            dispatch(request_return_pending())
            axios.post(`${process.env.REACT_APP_BACKEND_URL}orders/${id}/returns`, { data: { return_products: body } }, config(token)).then(succ => {
                //console.log("returns request", succ)
                dispatch(request_return_success(succ))
            }).catch(error => {
                dispatch(request_return_failed(error))
            })
        }
    }
}

function submit_auth_success(body) {
    //console.log(body)
    return {
        type: SEND_AUTH_SUCCESS,
        body: body
    }
}
function submit_auth_failed(body) {
    return {
        type: SEND_AUTH_FAILED,
        body: body
    }
}
function submit_auth_pending() {
    return {
        type: SEND_AUTH_PENDING
    }
}

export const submitAuthCode = (id, body) => {
    let token = sessionStorage.getItem("token")
    //console.log("action submit auth code", body);
    return dispatch => {
        if (token) {
            dispatch(submit_auth_pending())
            axios.post(`${process.env.REACT_APP_BACKEND_URL}orders/${id}/returns`, { data: { auth_code: body } }, config(token)).then(succ => {
                //console.log("submit auth code", succ)
                dispatch(submit_auth_success(succ))
            }).catch(error => {
                dispatch(submit_auth_failed(error))
            })
        }
    }
}


function get_return_summary_success(body) {
    //console.log(body)
    return {
        type: GET_RETURN_SUMMARY_SUCCESS,
        body: body
    }
}
function get_return_summary_failed(body) {
    return {
        type: GET_RETURN_SUMMARY_FAILED,
        body: body
    }
}
function get_return_summary_pending() {
    return {
        type: GET_RETURN_SUMMARY_PENDING
    }
}

export const getReturnSummary = (id, returnID) => {
    let token = sessionStorage.getItem("token")
    return dispatch => {
        if (token) {
            dispatch(get_return_summary_pending())
            axios.get(`${process.env.REACT_APP_BACKEND_URL}orders/${id}/returns/${returnID}`, config(token)).then(succ => {
                //console.log("return summary", succ)
                dispatch(get_return_summary_success(succ.data.data))
            }).catch(error => {
                dispatch(get_return_summary_failed(error))
            })
        }
    }
}


function send_return_summary_success(body) {
    //console.log(body)
    return {
        type: SEND_RETURN_SUMMARY_SUCCESS,
        body: body
    }
}
function send_return_summary_failed(body) {
    return {
        type: SEND_RETURN_SUMMARY_FAILED,
        body: body
    }
}
function send_return_summary_pending() {
    return {
        type: SEND_RETURN_SUMMARY_PENDING
    }
}

export const sendReturnSummary = (id, returnID, body) => {
    let token = sessionStorage.getItem("token")
    return dispatch => {
        if (token) {
            dispatch(send_return_summary_pending())
            axios.put(`${process.env.REACT_APP_BACKEND_URL}orders/${id}/returns/${returnID}`, { data: body }, config(token)).then(succ => {
                //console.log("send return summary", succ)
                dispatch(send_return_summary_success(succ))
            }).catch(error => {
                //console.log("err", error);
                dispatch(send_return_summary_failed(error))
            })
        }
    }
}


// Null status
export function nullStatus() {
    return {
        type: NULL_STATUS
    }
}