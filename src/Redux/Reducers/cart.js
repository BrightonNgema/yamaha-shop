import {
    GET_CART,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    ADD_TO_CART_FAILED,
    DELETE_FROM_CART_SUCCESS,
    DELETE_FROM_CART_FAILED,
    DELETE_FROM_CART_PENDING,
    GET_CART_SUCCESS,
    GET_CART_FAILED,
    GET_CART_PENDING,
    DELETE_CART_SUCCESS,
    DELETE_CART_FAILED,
    DELETE_CART_PENDING,
    APPLY_VOUCHER_REQUEST,
    APPLY_VOUCHER_SUCCESS,
    APPLY_VOUCHER_FAILED,
    REMOVE_VOUCHER_REQUEST,
    REMOVE_VOUCHER_SUCCESS,
    REMOVE_VOUCHER_FAILED,
    NULL_STATUS
} from '../Const/cart';
import axios from 'axios';
import { errorConfig } from '../service'
const initialState = {
    cart: [],
    total: 0,
    formattedData: "R 0",
    currentProduct: {},
    loading: false,
    singleItemLoadingAction: false,
    status: null,
    error: null,
    message: null,
    voucherApplied: null,
    discount: "",
    discountPercentage: "",
    vstatus: null,
    vloading: false,
}

export function cartReducer(state = initialState, action) {
    let data = null
    switch (action.type) {
        case DELETE_FROM_CART_SUCCESS:
            if (action.body.voucher_discount === "R 0.00") {
                return {
                    ...state,
                    cart: action.body.data,
                    total: action.body.total,
                    formattedData: action.body.formattedData,
                    singleItemLoadingAction: action.update ? true : false,
                    loading: false,
                    status: 'success_delete',
                }
            } else {
                return {
                    ...state,
                    cart: action.body.data,
                    total: action.body.total,
                    formattedData: action.body.formattedData,
                    singleItemLoadingAction: action.update ? true : false,
                    loading: false,
                    status: 'success_delete',
                    discount: action.body.voucher_discount,
                }
            }
        case DELETE_FROM_CART_FAILED:
            data = errorConfig(action.body)
            return {
                ...state,
                ...data,
                status: "failed_delete",
                singleItemLoadingAction: false,
                loading: false,
            }
        case DELETE_FROM_CART_PENDING:
            return {
                ...state,
                status: "pending",
                singleItemLoadingAction: true,
                loading: true,
            }
        case DELETE_CART_SUCCESS:
            return {
                ...state,
                cart: [],
                loading: false,
                status: "success_delete"

            }
        case DELETE_CART_FAILED:
            data = errorConfig(action.body)
            return {
                ...state,
                ...data,
                status: "failed_delete",
                loading: false,
            }
        case DELETE_CART_PENDING:
            return {
                ...state,
                status: "pending",
                loading: true,
            }
        case ADD_TO_CART_SUCCESS:

            if (action.body.voucher_discount === "R 0.00") {
                return {
                    ...state,
                    cart: action.body.data,
                    total: action.body.total,
                    formattedData: action.body.formattedData,
                    singleItemLoadingAction: action.update ? true : false,
                    loading: false,
                    status: 'success',
                }
            } else {
                return {
                    ...state,
                    cart: action.body.data,
                    total: action.body.total,
                    formattedData: action.body.formattedData,
                    singleItemLoadingAction: action.update ? true : false,
                    loading: false,
                    status: 'success',
                    discount: action.body.voucher_discount,
                }
            }
        case ADD_TO_CART_FAILED:
            data = errorConfig(action.body)
            return {
                ...state,
                ...data,
                status: "failed",
                singleItemLoadingAction: action.update ? true : false,
                loading: false,
            }
        case ADD_TO_CART_PENDING:
            return {
                ...state,
                singleItemLoadingAction: action.update ? true : false,
                status: "pending",
                loading: action.update ? true : false,
            }
        case GET_CART_SUCCESS:

            if (action.body.voucher_discount === "R 0.00") {

                return {
                    ...state,
                    cart: action.body.data,
                    total: action.body.total,
                    formattedData: action.body.formattedData,
                    loading: false,
                    status: 'success',
                }
            } else {

                return {
                    ...state,
                    cart: action.body.data,
                    total: action.body.total,
                    formattedData: action.body.formattedData,
                    loading: false,
                    status: 'success',
                    discount: action.body.voucher_discount,
                    discountPercentage: parseInt(action.body.discount),
                    voucherApplied: true,
                }

            }
        case GET_CART_FAILED:
            data = errorConfig(action.body)
            return { ...state, ...data, status: "failed" }
            break;
        case GET_CART_PENDING:
            return {
                ...state,
                loading: true,
                status: 'pending',
            }

        case APPLY_VOUCHER_REQUEST:
            return Object.assign({}, state, {
                vstatus: "pending",
                vloading: true,
            })
        case APPLY_VOUCHER_SUCCESS:

            const discount = action.body.data.cart.voucher_discount;
            const total = action.body.data.cart.formatted_cart_total;
            const percent = JSON.parse(action.body.data.cart.voucher).discount;
            return Object.assign({}, state, {
                vstatus: "success",
                voucherApplied: true,
                vloading: false,
                discount: discount,
                formattedData: total,
                discountPercentage: parseInt(percent)
            })
        case APPLY_VOUCHER_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                vstatus: "errors",
                ...data,
                vloading: false,
            })

        case REMOVE_VOUCHER_REQUEST:
            return Object.assign({}, state, {
                vstatus: "pending",
                vloading: true,
            })
        case REMOVE_VOUCHER_SUCCESS:

            return Object.assign({}, state, {
                vstatus: "success",
                voucherApplied: null,
                vloading: false,
                discount: "R 0.00",
                formattedData: action.body.data.cart.formatted_cart_total,
                discountPercentage: "",
            })
        case REMOVE_VOUCHER_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                vstatus: "errors",
                ...data,
                vloading: false,
            })

        case NULL_STATUS:
            return Object.assign({}, state, {
                vstatus: null,
                status: null
            })

        default:
            return state;
    }
}

