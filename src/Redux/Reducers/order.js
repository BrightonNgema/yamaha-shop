import {
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILED,
    GET_SINGLE_ORDER_REQUEST,
    GET_SINGLE_ORDER_SUCCESS,
    GET_SINGLE_ORDER_FAILED,

} from '../Const/order';
import { errorConfig } from '../service';


const initialState = {
    orders: [

    ],
    order: {
        id: null,
        data: [

        ]
    },
    orderSummary: {

    },
    loading: false,
    status: null,
    errors: null,
    message: null
}

export function orderReducer(state = initialState, action) {
    let data = null
    switch (action.type) {

        /********************************************** ALL ORDERS **********************************************/
        /* Cases when we get the table */
        case GET_ALL_ORDERS_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                status: "pending"
            })
        case GET_ALL_ORDERS_SUCCESS:
            //console.log(action.body)
            return Object.assign({}, state, {
                orders: [...action.body.data.orders],
                loading: false,
                status: 'success'
            })
        case GET_ALL_ORDERS_FAILED:
            data = errorConfig(action.body)

            return Object.assign({}, state, {
                ...data,
                loading: false,
                status: 'failed'
            })

        /********************************************** SINGLE ORDER **********************************************/

        case GET_SINGLE_ORDER_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                status: "pending"
            })
        case GET_SINGLE_ORDER_SUCCESS:
            let temp = action.body.singleOrder[0].orderData.map(val => {
                return {
                    acquired: true,
                    color: val.color,
                    imageUrl: val.imageUrl,
                    itemName: val.itemName,
                    price: val.formatted_total_including_vat,
                    quantity: val.quantity,
                    size: val.size,
                    shipment_method_id: val.shipment_method_id
                }
            })
            let tempWHole = action.body.singleOrder[0]
            tempWHole.orderData = temp
            return Object.assign({}, state, {
                order: action.body.singleOrder.length > 0 ? tempWHole : [],
                loading: false,
                status: 'success'
            })
        case GET_SINGLE_ORDER_FAILED:
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

