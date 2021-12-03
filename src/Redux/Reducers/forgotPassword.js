import {
    PASSWORD_FORGOT_REQUEST, PASSWORD_FORGOT_SUCCESS, PASSWORD_FORGOT_FAILED,
    PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILED,
    NULL_STATUS,
} from '../Const/forgotPassword';
import { errorConfig } from '../service';

const initialState = {
    email: "",
    loadingState: false,
    status: null,
    error: null,
    message: null
}

export function forgotPasswordReducer(state = initialState, action) {
    let data = null
    switch (action.type) {

        case PASSWORD_FORGOT_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true,
            })

        case PASSWORD_FORGOT_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                message: action.body.data,
                loadingState: false,
            })

        case PASSWORD_FORGOT_FAILED:
            data = errorConfig(action.body);
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loadingState: false,
            })

        /*******************************************************************/
        case PASSWORD_RESET_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true,
            })

        case PASSWORD_RESET_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                message: action.body.data,
                loadingState: false,
            })

        case PASSWORD_RESET_FAILED:
            data = errorConfig(action.body);
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loadingState: false,
            })

        /*******************************************************************/
        case NULL_STATUS:
            //console.log("nulled")
            return Object.assign({}, state, {
                status: null,
                message: null

            })

        default:
            return state;

    }
}