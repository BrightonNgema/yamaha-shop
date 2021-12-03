import { combineReducers } from 'redux'

import { authReducer } from './auth'
import { cartReducer } from './cart'
import { orderReducer } from './order';
import { productReducer } from './product'
import { forgotPasswordReducer } from './forgotPassword';
import { orderProcessReducer } from './orderProcess';
import { addressReducer } from './address';
import { userReducer } from './user'
import { returnReducer } from './returns'
const yamahaShop = combineReducers({
    authReducer, cartReducer, orderReducer,
    forgotPasswordReducer, productReducer, orderProcessReducer,
    addressReducer, userReducer, returnReducer
})

export default yamahaShop;