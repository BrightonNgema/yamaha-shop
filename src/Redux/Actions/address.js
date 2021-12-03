import {
    GET_ADDRESSES_REQUEST,
    GET_ADDRESSES_SUCCESS,
    GET_ADDRESSES_FAILED,
    GET_SINGLE_ADDRESS_REQUEST,
    GET_SINGLE_ADDRESS_SUCCESS,
    GET_SINGLE_ADDRESS_FAILED,
    ADD_ADDRESS_REQUEST,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILED,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILED,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILED,
    NULL_STATUS,
    NULL_MESSAGE,
} from '../Const/address'
import axios from 'axios';
import { config } from '../service';

/****************************************************************************************************/
export const getAddresses = () => {
    let token = sessionStorage.getItem("token")
    if (token) {
        return dispatch => {
            dispatch(get_addresses_request())
            axios.get(process.env.REACT_APP_BACKEND_URL + 'auth/address', config(token)).then(
                succ => {

                    dispatch(get_addresses_success(succ))
                }
            ).catch(
                err => {
                    dispatch(get_addresses_failed(err))
                }
            )
        }
    }
}

function get_addresses_request() {
    return {
        type: GET_ADDRESSES_REQUEST
    }
}
function get_addresses_success(data) {
    return {
        type: GET_ADDRESSES_SUCCESS,
        body: data
    }
}
function get_addresses_failed(data) {
    return {
        type: GET_ADDRESSES_FAILED,
        body: data
    }
}

/****************************************************************************************************/

export const getAddress = (id) => {
    let token = sessionStorage.getItem("token")
    if (token) {
        return dispatch => {
            axios.get(process.env.REACT_APP_BACKEND_URL + 'auth/address/' + id, config(token)).then(
                succ => {

                    dispatch(get_address_success(succ))
                }
            ).catch(
                err => {
                    dispatch(get_address_failed(err))
                }
            )

        }
    }
}

function get_address_request() {
    return {
        type: GET_SINGLE_ADDRESS_REQUEST
    }
}
function get_address_success(data) {
    return {
        type: GET_SINGLE_ADDRESS_SUCCESS,
        body: data
    }
}
function get_address_failed(data) {
    return {
        type: GET_SINGLE_ADDRESS_FAILED,
        body: data
    }
}

/****************************************************************************************************/

export const addAddress = (body) => {
    let token = sessionStorage.getItem("token")
    if (token) {
        return dispatch => {
            dispatch(add_address_request());
            axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/address', body, config(token)).then(
                succ => {

                    dispatch(add_address_success(succ))
                }
            ).catch(
                err => {
                    dispatch(add_address_failed(err))
                }
            )
        }
    }
}
function add_address_request() {
    return {
        type: ADD_ADDRESS_REQUEST
    }
}
function add_address_success(data) {
    return {
        type: ADD_ADDRESS_SUCCESS,
        body: data
    }
}
function add_address_failed(data) {
    return {
        type: ADD_ADDRESS_FAILED,
        body: data
    }
}

/****************************************************************************************************/

export const putAddress = (id, body) => {
    let token = sessionStorage.getItem("token")
    if (token) {
        return dispatch => {
            dispatch(put_address_request())
            axios.put(process.env.REACT_APP_BACKEND_URL + 'auth/address/' + id, body, config(token)).then(
                succ => {

                    dispatch(put_address_success(succ))
                }
            ).catch(
                err => {
                    dispatch(put_address_failed(err))
                }
            )
        }
    }
}
function put_address_request() {
    return {
        type: UPDATE_ADDRESS_REQUEST
    }
}
function put_address_success(data) {
    return {
        type: UPDATE_ADDRESS_SUCCESS,
        body: data
    }
}
function put_address_failed(data) {
    return {
        type: UPDATE_ADDRESS_FAILED,
        body: data
    }
}

/****************************************************************************************************/

export const deleteAddress = (id) => {
    let token = sessionStorage.getItem("token")
    if (token) {
        return dispatch => {
            dispatch(delete_address_request());
            axios.delete(process.env.REACT_APP_BACKEND_URL + 'auth/address/' + id, config(token)).then(
                succ => {
                    dispatch(delete_address_success(succ, id))
                }
            ).catch(
                err => {
                    dispatch(delete_address_failed(err))
                }
            )
        }
    }
}
function delete_address_request() {
    return {
        type: DELETE_ADDRESS_REQUEST
    }
}
function delete_address_success(data, id) {
    return {
        type: DELETE_ADDRESS_SUCCESS,
        body: { data, id }
    }
}
function delete_address_failed(data) {
    return {
        type: DELETE_ADDRESS_FAILED,
        body: data
    }
}

// Null status
export function nullStatus() {
    return {
        type: NULL_STATUS
    }
}
