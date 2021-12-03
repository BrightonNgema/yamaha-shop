import ReactDOM from 'react-dom'
import React from 'react'
import './index.css'
import { configureMockApi, configureApi } from 'api';
import routes from './routes'
import * as serviceWorker from './serviceWorker'
import yamahaShop from './Redux/Reducers'
import { Provider } from 'react-redux'
import { getUser } from './Redux/Actions/user'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const store = createStore(yamahaShop, applyMiddleware(thunk))
configureMockApi('');
configureApi();

store.dispatch(getUser())
ReactDOM.render(<Provider store={store}>
  {routes}
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
