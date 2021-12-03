import {
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILED,
    GET_SINGLE_ORDER_REQUEST,
    GET_SINGLE_ORDER_SUCCESS,
    GET_SINGLE_ORDER_FAILED,

} from '../Const/order'
import axios from 'axios';

/********************************************** ALL ORDERS **********************************************/

/* Actions when we get the table */
function getOrdersPending() {
    return {
        type: GET_ALL_ORDERS_REQUEST
    }
}

function getOrdersSuccess(body) {
    return {
        type: GET_ALL_ORDERS_SUCCESS,
        body: body
    }
}

function getOrdersError(body) {
    return {
        type: GET_ALL_ORDERS_FAILED,
        body: body
    }
}

export const config = (token) => {
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}
/* Actions when we get the table ^ */

export const fetchOrders = () => {
    let token = sessionStorage.getItem("token");

    if (token) {
        return dispatch => {
            dispatch(getOrdersPending());
            axios.get(process.env.REACT_APP_BACKEND_URL + 'orders', config(token))
                .then(
                    res => {

                        dispatch(getOrdersSuccess(res));
                    }
                ).catch(
                    error => {
                        dispatch(getOrdersError(error));
                    }
                )
        }
    } else {
        //No Auth
    }

}

/********************************************** SINGLE ORDER **********************************************/

/* Actions when we get the table */
function getSingleOrderPending() {
    return {
        type: GET_SINGLE_ORDER_REQUEST
    }
}

function getSingleOrderSuccess(body) {
    return {
        type: GET_SINGLE_ORDER_SUCCESS,
        body: body
    }
}

function getSingleOrderError(body) {
    return {
        type: GET_SINGLE_ORDER_FAILED,
        body: body
    }
}
/* Actions when we get the table ^ */

export const fetchSingleOrder = (id) => {
    let token = sessionStorage.getItem("token");
    return dispatch => {
        dispatch(getSingleOrderPending());
        axios.get(process.env.REACT_APP_BACKEND_URL + 'orders/' + id, config(token))
            .then(
                res => {

         
                    dispatch(getSingleOrderSuccess(res.data));
                }
            ).catch(
                error => {

                    dispatch(getSingleOrderError(error));
                }
            )
    }
}

