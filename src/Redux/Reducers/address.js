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
import { errorConfig } from '../service'
const initialState = {
    error: null,
    status: null,
    message: null,
    loadingState: false,
    isEmpty: true,
    isEdit: false,
    addresses: [

    ],
    address: {}
}

export function addressReducer(state = initialState, action) {
    let data = null
    switch (action.type) {
        /*******************************************************************/
        case GET_ADDRESSES_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true
            })
        case GET_ADDRESSES_SUCCESS:
        
            return Object.assign({}, state, {
                status: "success",
                loggedIn: true,
                addresses: action.body.data.data,
                loadingState: false,
            })
        case GET_ADDRESSES_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                status: "errors",
                loadingState: false,
                ...data
            })
        /*******************************************************************/
        case GET_SINGLE_ADDRESS_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true
            })
        case GET_SINGLE_ADDRESS_SUCCESS:
      
            return Object.assign({}, state, {
                status: "success",
                isEdit: false,
                address: action.body.data.data,
                loadingState: false,
                message: null
            })
        case GET_SINGLE_ADDRESS_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                status: "errors",
                loadingState: false,
                ...data
            })
        /*******************************************************************/
        case ADD_ADDRESS_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true
            })
        case ADD_ADDRESS_SUCCESS:
          
            return Object.assign({}, state, {
                status: "success",
                message: action.body.data.message,
                isEdit: true,
                address: action.body.data.data,
                loadingState: false,
            })
        case ADD_ADDRESS_FAILED:
            data = errorConfig(action.body)
       
            return Object.assign({}, state, {
                status: "errors",
                loadingState: false,
                ...data
            })
        /*******************************************************************/
        case UPDATE_ADDRESS_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true
            })
        case UPDATE_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                isEdit: false,
                loadingState: false,
                message: action.body.data.message,
                address: action.body.data.data,

            })
        case UPDATE_ADDRESS_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loadingState: false
            })
        /*******************************************************************/
        case DELETE_ADDRESS_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true
            })
        case DELETE_ADDRESS_SUCCESS:

            let tempAddress = state.addresses.filter(address => {
                return address.id !== action.body.id
            })
            return Object.assign({}, state, {
                status: "success",
                loadingState: false,
                message: action.body.data.data.message,
                addresses: tempAddress,

            })
        case DELETE_ADDRESS_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loadingState: false
            })
        /*******************************************************************/
        case NULL_STATUS:
    
            return Object.assign({}, state, {
                status: null,
                message: null

            })

        default:
            return state;
    }

}