import { // Profile setting
    SET_PROFILE_REQUEST,
    SET_PROFILE_SUCCESS,
    SET_PROFILE_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    USER_NO_AUTH,
    NULL_STATUS,
} from '../Const/user';
import { errorConfig } from '../service';


const initialState = {
    loggedIn: false,
    loadingState: false,
    error: null,
    status: null,
    message: null,
    loading: null,
    user: {
        email: "",
        name: "",
        surname: "",
        phone: "",
        default_address: "",
    },
}


export function userReducer(state = initialState, action) {
    let data = null;
    switch (action.type) {

        case USER_NO_AUTH:
            return Object.assign({}, state, {
                loggedIn: false,
                status: null,
                loadingState: false
            })
        case NULL_STATUS:
   
            return Object.assign({}, state, {
                status: null,
                message: null,
            })

        // getUser requests
        case GET_USER_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loadingState: true,
                loading: true
            })
        case GET_USER_SUCCESS:
            sessionStorage.setItem('user_id', action.body.data.id)
            return Object.assign({}, state, {
                status: "success",
                loggedIn: true,
                user: action.body.data,
                loadingState: false,
                loading: false
            })
        case GET_USER_FAILED:
            data = errorConfig(action.body)
            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loadingState: false,
                loading: false
            })

        case SET_PROFILE_REQUEST:
            return Object.assign({}, state, {
                status: "pending",
                loading: true
            })

        case SET_PROFILE_SUCCESS:
            let message = "";
            if (action.body) {
                message = action.body.data.message
            }
            return Object.assign({}, state, {
                status: "success",
                loading: false,
                message: message,
                user: action.body.data.data,
            })

        case SET_PROFILE_FAILED:
            data = errorConfig(action.body)

            return Object.assign({}, state, {
                ...data,
                status: "errors",
                loading: false,

            })
        default:
            return state;
    }
}