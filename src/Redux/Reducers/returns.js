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

import { errorConfig } from '../service'

const initialState = {
    error: null, status: null,
    message: null,
    returns: {

    },
    returnStatus: null,
    requestSent: false,
    authSent: false,
    returnSummary: {},
    returnId: null
}

export function returnReducer(state = initialState, action) {
    let data = null;
    switch (action.type) {
        case GET_ALL_RETURN_PRODUCTS_SUCCESS:
            //console.log(action.body)
            if (action.body.return_status !== undefined) {
                return Object.assign({}, state, { status: "success", returns: action.body.order_products, returnStatus: action.body.return_status, returnId: action.body.id })
            } else {
                return Object.assign({}, state, { status: "success", returns: action.body.order_products, returnId: action.body.id })
            }

        case GET_ALL_RETURN_PRODUCTS_PENDING:
            return Object.assign({}, state, { status: "pending" })
        case GET_ALL_RETURN_PRODUCTS_FAILED:
            return Object.assign({}, state, { status: "failed" })

        case REQUEST_RETURNS_SUCCESS:
            //console.log("Request Success", action.body)
            return Object.assign({}, state, { status: "success", requestSent: true, })
        case REQUEST_RETURNS_PENDING:
            return Object.assign({}, state, { status: "pending" })
        case REQUEST_RETURNS_FAILED:
            return Object.assign({}, state, { status: "failed" })

        case SEND_AUTH_SUCCESS:
            //console.log("Request Success", action.body)
            return Object.assign({}, state, { status: "success", authSent: true })
        case SEND_AUTH_PENDING:
            return Object.assign({}, state, { status: "pending" })
        case SEND_AUTH_FAILED:
            data = errorConfig(action.body);
            //console.log("auth failed", data);
            return Object.assign({}, state, { ...data, status: "failed" })

        case GET_RETURN_SUMMARY_PENDING:
            return Object.assign({}, state, { status: "pending" })
        case GET_RETURN_SUMMARY_SUCCESS:
            //console.log("body", action.body)
            return Object.assign({}, state, { status: "success", returnSummary: action.body })
        case GET_RETURN_SUMMARY_FAILED:
            data = errorConfig(action.body);
            //console.log("get summary failed", data);
            return Object.assign({}, state, { ...data, status: "failed" })

        case SEND_RETURN_SUMMARY_PENDING:
            return Object.assign({}, state, { status: "pending" })
        case SEND_RETURN_SUMMARY_SUCCESS:

            return Object.assign({}, state, { status: "success", returnSummary: action.body })
        case SEND_RETURN_SUMMARY_FAILED:
            //console.log("Summary failed", action.body);
            data = errorConfig(action.body);
            //console.log("data", data)
            //console.log("get summary failed", data);
            return Object.assign({}, state, { ...data, status: "failed" })

        case NULL_STATUS:
            //console.log("nulled")
            return Object.assign({}, state, { status: null, authSent: false, requestSent: false })
        default:
            return state;
    }
}