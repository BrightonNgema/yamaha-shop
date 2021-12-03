import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAILED
} from '../Const/product.js'
import { errorConfig } from '../service'
const initialState = {
    currentProduct: {

    },
    errors: null,
    message: null,
    status: null,
}

export function productReducer(state = initialState, action) {
    let data = null
    switch (action.type) {
        case PRODUCT_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                status: "pending"
            })
        case PRODUCT_SUCCESS:

            return Object.assign({}, state, {
                currentProduct: action.body.data.data,
                loading: false,
                status: 'success'
            })

        case PRODUCT_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                ...data,
                loading: false,

                status: 'failed'
            })

        default:
            return state;
    }
}

