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
import axios from 'axios';
import { config } from '../service';


/************************* NULL *************************/
export function null_status() {
    return {
        type: NULL_STATUS
    }
}

export function no_auth() {
    return {
        type: USER_NO_AUTH
    }
}

/************************* GET USER *************************/
export const getUser = () => {
    let token = sessionStorage.getItem("token")
    if (token) {

        return dispatch => {
            dispatch(get_user_request());
            axios.get(process.env.REACT_APP_BACKEND_URL + 'auth/user', config(token)).then(
                succ => {
                    dispatch(get_user_success(succ))
                }
            ).catch(error => {
                dispatch(get_user_failed(error))
            })
        }
    } else {
        return dispatch => { dispatch(no_auth()) }
    }

}

function get_user_request() {
    return {
        type: GET_USER_REQUEST,

    }
}
function get_user_failed(data) {
    return {
        type: GET_USER_FAILED,
        body: data
    }
}
function get_user_success(data) {
    return {
        type: GET_USER_SUCCESS,
        body: data
    }
}

/************************* UPDATE PROFILE *************************/
export const profileSet = (body) => {
    let token = sessionStorage.getItem("token")
    let user_id=sessionStorage.getItem("user_id");
    if (token) {
        return dispatch => {
            dispatch(set_profile_request())
            axios.put(process.env.REACT_APP_BACKEND_URL + 'auth/profile/'+user_id, body, config(token)).then(
                succ => {
                   
                    dispatch(set_profile_success(succ));
                }
            ).catch(err => {
       
                dispatch(set_profile_failed(err));
            })
        }
    }
}

function set_profile_request() {
    return {
        type: SET_PROFILE_REQUEST,
    }
}

function set_profile_success(body) {
    return {
        type: SET_PROFILE_SUCCESS,
        body: body
    }
}
function set_profile_failed(body) {

    return {
        type: SET_PROFILE_FAILED,
        body: body
    }
}
