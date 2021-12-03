import {
    GET_DELIVERY_INFO_REQUEST, GET_DELIVERY_INFO_SUCCESS, GET_DELIVERY_INFO_FAILED,
    SEND_DELIVERY_INFO_REQUEST, SEND_DELIVERY_INFO_SUCCESS, SEND_DELIVERY_INFO_FAILED,
    SEND_ADDITIONAL_INFO_REQUEST, SEND_ADDITIONAL_INFO_SUCCESS, SEND_ADDITIONAL_INFO_FAILED,
    GET_ORDER_SUMMARY_REQUEST, GET_ORDER_SUMMARY_SUCCESS, GET_ORDER_SUMMARY_FAILED, SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILED,
} from '../Const/orderProcess';
import axios from 'axios';
import { config } from '../service';
/*********************************************************************************************************/
/*******************************************  Delivery Address *******************************************/
const get_delivery_info_request = () => {
    return {
        type: GET_DELIVERY_INFO_REQUEST,
    }
}
const get_delivery_info_success = (body) => {
    return {
        type: GET_DELIVERY_INFO_SUCCESS,
        body: body
    }
}
const get_delivery_info_failed = (body) => {
    return {
        type: GET_DELIVERY_INFO_FAILED,
        body: body
    }
}

//TODO: Get Delivery Info
export const getDeliveryInfo = () => {
    let token = sessionStorage.getItem("token")
    if (token) {
        return dispatch => {
            dispatch(get_delivery_info_request())
            axios.get(process.env.REACT_APP_BACKEND_URL + '', config(token)).then(
                resp => {
                    //console.log(resp);
                    // dispatch(get_delivery_info_request(succ));
                }
            ).catch(error => {
                //console.log(error);
                // dispatch(get_delivery_info_failed(error));
            })
        }
    } else {
        return dispatch => { /* No Auth */ }
    }
}

const send_delivery_info_request = () => {
    return {
        type: SEND_DELIVERY_INFO_REQUEST,
    }
}
const send_delivery_info_success = (body) => {
    return {
        type: SEND_DELIVERY_INFO_SUCCESS,
        body: body
    }
}
const send_delivery_info_failed = (body) => {
    return {
        type: SEND_DELIVERY_INFO_FAILED,
        body: body
    }
}



//TODO: Post Delivery Info
export const addDeliveryInfo = (body) => {
    return dispatch => {
        dispatch(send_delivery_info_request());
        axios.post(process.env.REACT_APP_BACKEND_URL + '', body).then(
            resp => {
                //console.log(resp);
                // dispatch(send_delivery_info_success(resp));
            }
        ).catch(error => {
            //console.log(error);
            // dispatch(send_delivery_info_failed(error));
        })
    }
}

/********************************************************************************************************/
/*******************************************  Additional Info *******************************************/


//TODO: Post Additional Info
export const addAdditionalInfo = (body) => {
    return dispatch => {
        dispatch(send_additional_info_request());
        axios.post(process.env.REACT_APP_BACKEND_URL + '', body).then(
            resp => {
                //console.log(resp);
                // dispatch(send_additional_info_success(resp));
            }
        ).catch(error => {
            //console.log(error);
            // dispatch(send_additional_info_failed(error));
        })
    }
}

function send_additional_info_request() {
    return {
        type: SEND_ADDITIONAL_INFO_REQUEST,
    }
}
function send_additional_info_success(body) {
    return {
        type: SEND_ADDITIONAL_INFO_SUCCESS,
        body: body
    }
}
function send_additional_info_failed(body) {
    return {
        type: SEND_ADDITIONAL_INFO_FAILED,
        body: body
    }
}

/*****************************************************************************************************/
/******************************************* Order Summary *******************************************/

//TODO: Get Order Summary
export const getOrderSummary = () => {
    return dispatch => {
        let token = sessionStorage.getItem("token")
        dispatch(getOrderSummaryPending())
        axios.get(`${process.env.REACT_APP_BACKEND_URL}auth/order-summary`, config(token)).then(succ => {
           
            dispatch(getOrderSummarySuccess(succ.data));
        }).catch(err => {
            dispatch(getOrderSummaryFailed(err))
        })
    }
}

function getOrderSummarySuccess(body) {
    return {
        type: GET_ORDER_SUMMARY_SUCCESS,
        body: body
    }
}

function getOrderSummaryPending() {
    return {
        type: GET_ORDER_SUMMARY_REQUEST
    }
}

function getOrderSummaryFailed(body) {
    return {
        type: GET_ORDER_SUMMARY_FAILED,
        body: body
    }
}

export function submitOrder(body) {
    return dispatch => {
        let token = sessionStorage.getItem("token");
        dispatch(submit_order_pending())
        axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/checkout/save-checkout`, body, config(token)).then(succ => {
           
            dispatch(submit_order_success(succ.data))
        }).catch(error => {
            console.error(error)
            if(error.response.data["Allow_checkout"]==false){
                let err=error;
                err.response.data.message=err.response.data.Message
                dispatch(submit_order_failed(err))
            }
        })
    }
}

function submit_order_pending() {
    return {
        type: SUBMIT_ORDER_REQUEST
    }
}

function submit_order_success(body) {
    return {
        type: SUBMIT_ORDER_SUCCESS,
        body: body
    }
}

function submit_order_failed(body) {
    return {
        type: SUBMIT_ORDER_FAILED,
        body:body
    }
}