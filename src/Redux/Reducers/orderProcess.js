import {
    GET_DELIVERY_INFO_FAILED,
    GET_DELIVERY_INFO_SUCCESS,
    GET_DELIVERY_INFO_REQUEST,
    SEND_DELIVERY_INFO_REQUEST,
    SEND_DELIVERY_INFO_SUCCESS,
    SEND_DELIVERY_INFO_FAILED,
    SEND_ADDITIONAL_INFO_REQUEST,
    SEND_ADDITIONAL_INFO_SUCCESS,
    SEND_ADDITIONAL_INFO_FAILED,
    GET_ORDER_SUMMARY_REQUEST,
    GET_ORDER_SUMMARY_SUCCESS,
    GET_ORDER_SUMMARY_FAILED,
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILED
} from '../Const/orderProcess';
import { errorConfig ,checks} from '../service';

const initialState = {
    status: null,
    loading: false,
    error: {},
    message: null,
    deliveryInfo: {
        gettingData: "none"
    },
    orderSummary: {
        gettingData: "none"
    },
    cart: [],

}

export function orderProcessReducer(state = initialState, action) {

    let data = null
    switch (action.type) {
        /*******************************************  Delivery Address *******************************************/
        case GET_DELIVERY_INFO_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loading: true
            })
        case GET_DELIVERY_INFO_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                deliveryInfo: action.body.data,
                loading: false,
            })
        case GET_DELIVERY_INFO_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loading: false
            })
        case SEND_DELIVERY_INFO_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loading: true
            })
        case SEND_DELIVERY_INFO_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                message: action.body.message,
                loading: false,
            })
        case SEND_DELIVERY_INFO_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loading: false
            })

        /*******************************************  Additional Info *******************************************/
        case SEND_ADDITIONAL_INFO_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loading: true
            })
        case SEND_ADDITIONAL_INFO_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                message: action.body.message,
                loading: false,
            })
        case SEND_ADDITIONAL_INFO_FAILED:
            return Object.assign({}, state, {
                error: action.body.errors,
                status: "errors",
                loading: false
            })

        /******************************************* Order Summary *******************************************/
        case GET_ORDER_SUMMARY_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                status: "pending"
            })
        case GET_ORDER_SUMMARY_SUCCESS:
            let cart = []
            if (action.body.cart) {
                let objK = Object.keys(action.body.cart)

                objK.forEach(item => {

                    if (checks(item)) {

                        cart.push(JSON.parse(action.body.cart[item]))
                    }
                })
            }

            return Object.assign({}, state, {
                orderSummary: action.body,
                cart: cart,
                loading: true,
                status: "success"
            })
        case GET_ORDER_SUMMARY_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                ...data,
                loading: true,
                status: "failed"
            })
        case SUBMIT_ORDER_REQUEST:
            return Object.assign({}, state, {
               
                status: "order-pending"
            })
        case SUBMIT_ORDER_SUCCESS:
            //console.log(action.body)
            return Object.assign({}, state, {
                redir:{checksum:action.body.checksum,paygate_request:action.body.paygate_request},
                status: "order-success"
            })
        case SUBMIT_ORDER_FAILED:
            data=errorConfig(action.body);
            return Object.assign({}, state, {
               ...data,
                status: "order-failed"
            })
        default:
            return state;
    }
}
