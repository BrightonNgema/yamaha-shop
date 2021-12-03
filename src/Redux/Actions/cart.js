import {
    GET_CART_SUCCESS,
    GET_CART_FAILED,
    GET_CART_PENDING,
    APPLY_VOUCHER_REQUEST,
    APPLY_VOUCHER_SUCCESS,
    APPLY_VOUCHER_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    ADD_TO_CART_FAILED,
    DELETE_FROM_CART_SUCCESS,
    DELETE_FROM_CART_FAILED,
    DELETE_FROM_CART_PENDING,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_FAILED,
    UPDATE_CART_PENDING,
    DELETE_CART_SUCCESS,
    DELETE_CART_FAILED,
    DELETE_CART_PENDING,
    REMOVE_VOUCHER_REQUEST,
    REMOVE_VOUCHER_SUCCESS,
    REMOVE_VOUCHER_FAILED,
    NULL_STATUS,
} from '../Const/cart';
import axios from 'axios';
import { config, checks } from '../service';


function add_item_to_cart_success(body, update = false) {
    let obj = {
        type: ADD_TO_CART_SUCCESS,
        body: body
    }
    if (update) {
        obj.update = true;
    }
    return obj

}

function add_item_to_cart_failed(body, update = false) {
    let obj = {
        type: ADD_TO_CART_FAILED,
        body: body
    }
    if (update) {
        obj.update = true;
    }
    return obj

}
function add_item_to_cart_pending(update = false) {
    let obj = {
        type: ADD_TO_CART_PENDING
    }
    if (update) {
        obj.update = true;
    }
    return obj
}


function get_cart_success(body) {
    return {
        type: GET_CART_SUCCESS,
        body: body
    }
}

function get_cart_failed(body) {
    return {
        type: GET_CART_FAILED,
        body: body
    }
}

function get_cart_pending() {
    return {
        type: GET_CART_PENDING
    }
}

function delete_from_cart_success(body) {
    console.log('hey')
    return {
        type: DELETE_FROM_CART_SUCCESS,
        body: body
    }
}
function delete_from_cart_failed(body) {
    return {
        type: DELETE_FROM_CART_FAILED,
        body: body
    }
}
function delete_from_cart_pending() {
    return {
        type: DELETE_FROM_CART_PENDING
    }
}




export const getCartDetails = () => {
    let cart_id = localStorage.getItem("cart_id");
    return dispatch => {
        if (cart_id) {
            dispatch(get_cart_pending())
            axios.get(process.env.REACT_APP_BACKEND_URL + 'cart/' + cart_id)
                .then(res => {
                    //console.log("res from cart details", res);
                    let tempData = [];
                    let items = Object.keys(res.data)
                  
                    items.forEach(item => {
                        
                        if (checks(item)) {
                            tempData.push(JSON.parse(res.data[item]))
                        }

                    })

                    if (res.data.voucher !== undefined) {
                        dispatch(get_cart_success({
                            total: res.data.cart_total,
                            formattedData: res.data.formatted_cart_total,
                            data: tempData,
                            voucher_discount: res.data.voucher_discount,
                            discount: JSON.parse(res.data.voucher).discount
                        }));
                    } else {
                        dispatch(get_cart_success({
                            total: res.data.cart_total,
                            formattedData: res.data.formatted_cart_total,
                            data: tempData,
                            voucher_discount: res.data.voucher_discount
                        }));
                    }


                }).catch(error => {
           
                    dispatch(get_cart_failed(error));
                })
        } else {
            dispatch(get_cart_failed("No cart"));
        }
    }
}



export const addProductsToCart = (body, update = false) => {

    return dispatch => {
        let cart_id = localStorage.getItem("cart_id");

        if (cart_id && cart_id !== undefined) {
            body.uuid = cart_id;

        }

        let token = sessionStorage.getItem("token");
        dispatch(update ? add_item_to_cart_pending(update) : add_item_to_cart_pending())
        axios.post(`${process.env.REACT_APP_BACKEND_URL}cart`, body, token ? config(token) : null).then(
            succ => {

                let data = []
                let tempArray = Object.keys(succ.data);

                tempArray.forEach(item => {
                    if (checks(item)) {
                        try {
                            data.push(JSON.parse(succ.data[item]));
                        } catch (Exception) {

                        }


                    }
                })

      
                localStorage.setItem('cart_id', succ.data.uuid)


                if (succ.data.voucher !== undefined) {
                    dispatch(update ? add_item_to_cart_success({
                        total: succ.data.cart_total,
                        formattedData: succ.data.formatted_cart_total,
                        data: data,
                        voucher_discount: succ.data.voucher_discount,
                    }, update) : add_item_to_cart_success({
                        total: succ.data.cart_total,
                        formattedData: succ.data.formatted_cart_total,
                        data: data,
                        voucher_discount: succ.data.voucher_discount,
                    }))
                } else {
                    dispatch(update ? add_item_to_cart_success({
                        total: succ.data.cart_total,
                        formattedData: succ.data.formatted_cart_total,
                        data: data,
                    }, update) : add_item_to_cart_success({
                        total: succ.data.cart_total,
                        formattedData: succ.data.formatted_cart_total,
                        data: data
                    }))
                }
            }
        ).catch(err => {

            dispatch(update ? add_item_to_cart_failed(err, update) : add_item_to_cart_failed(err))
        })
    }
}


export const deleteProduct = (body) => {
    return dispatch => {
        let cart_id = localStorage.getItem("cart_id");
        if (cart_id) {
            body.uuid = cart_id;
        }
        let token = sessionStorage.getItem("token");
        let heads = {
            ...config(token),
            data: body
        }
        dispatch(delete_from_cart_pending())

        axios.delete(`${process.env.REACT_APP_BACKEND_URL}cart/item/` + cart_id, heads).then(
            res => {
            
               let tempData = [];
               let items = Object.keys(res.data.cart)
             
               items.forEach(item => {
                   
                   if (checks(item)) {
                       console.log(item)
                       tempData.push(JSON.parse(res.data.cart[item]))
                   }

               })

               if (res.data.voucher !== undefined) {
    
                   dispatch(delete_from_cart_success({
                       total: res.data.cart.cart_total,
                       formattedData: res.data.cart.formatted_cart_total,
                       data: tempData,
                       voucher_discount: res.data.cart.voucher_discount,
                       discount: JSON.parse(res.data.cart.voucher).discount
                   }));
               } else {
        
                   dispatch(delete_from_cart_success({
                       total: res.data.cart.cart_total,
                       formattedData: res.data.cart.formatted_cart_total,
                       data: tempData,
                       voucher_discount: res.data.cart.voucher_discount
                   }));
               }

            }
        ).catch(err => {
            
            dispatch(delete_from_cart_failed(err))
        })
    }

}

function delete_cart_success(body) {
    return {
        type: DELETE_CART_SUCCESS,
        body: body
    }
}
function delete_cart_failed(body) {
    return {
        type: DELETE_CART_FAILED,
        body: body
    }
}
function delete_cart_pending() {
    return {
        type: DELETE_CART_PENDING
    }
}

export const deleteCart = () => {
    return dispatch => {
        let cart_id = localStorage.getItem("cart_id");
        let token = sessionStorage.getItem("token");

        dispatch(delete_cart_pending())

        axios.delete(`${process.env.REACT_APP_BACKEND_URL}cart/` + cart_id).then(
            succ => {
                dispatch(delete_cart_success(succ))
            }
        ).catch(err => {
            dispatch(delete_cart_failed(err))
        })
    }

}

/*********************** VOUCHERS ***********************/

function apply_voucher_success(body) {
    return {
        type: APPLY_VOUCHER_SUCCESS,
        body: body
    }
}
function apply_voucher_failed(body) {
    return {
        type: APPLY_VOUCHER_FAILED,
        body: body
    }
}
function apply_voucher_request() {
    return {
        type: APPLY_VOUCHER_REQUEST,
    }
}

export const addVoucher = (voucher) => {
    let token = sessionStorage.getItem("token");
    return dispatch => {
        if (token) {
            dispatch(apply_voucher_request());
            axios.get(process.env.REACT_APP_BACKEND_URL + "auth/voucher/" + voucher, config(token)).then(
                resp => {
              
                    dispatch(apply_voucher_success(resp));
                }
            ).catch(error => {
                dispatch(apply_voucher_failed(error));
            })
        }
    }
}

function remove_voucher_success(body) {
    return {
        type: REMOVE_VOUCHER_SUCCESS,
        body: body
    }
}
function remove_voucher_failed(body) {
    return {
        type: REMOVE_VOUCHER_FAILED,
        body: body
    }
}
function remove_voucher_request() {
    return {
        type: REMOVE_VOUCHER_REQUEST,
    }
}

export const removeVoucher = () => {
    let token = sessionStorage.getItem("token");
    let cart_id = localStorage.getItem("cart_id");
    return dispatch => {
        if (token) {
            dispatch(remove_voucher_request());
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}cart/` + cart_id + "/voucher").then(
                resp => {
                   
                    dispatch(remove_voucher_success(resp));
                }
            ).catch(error => {
                dispatch(remove_voucher_failed(error));
            })
        }
    }
}

// Null status
export function nullStatus() {
    return {
        type: NULL_STATUS
    }
}