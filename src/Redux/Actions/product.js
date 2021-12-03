import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAILED
} from '../Const/product.js'
import axios from 'axios';



export const getProduct = (id) => {
    return dispatch => {
        dispatch(getProductRequest())
        axios.get(`${process.env.REACT_APP_BACKEND_URL}products/${id}`)
            .then(resp => {
                dispatch(getProductSuccess(resp))
            }).catch(error => {
                dispatch(getProductFailed(error))
            })
    }
}

function getProductRequest() {
    return {
        type: PRODUCT_REQUEST
    }
}

function getProductSuccess(body) {
   
    return {
        type: PRODUCT_SUCCESS,
        body: body
    }
}

function getProductFailed(body) {
    return {
        type: PRODUCT_FAILED,
        body: body
    }
}