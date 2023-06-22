import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import { cartReducer } from '../reducers/cartReducers'
import { userLoginReducer, userSignUpReducer, userDetailsReducer, userUpdateProfileReducer } from '../reducers/userReducers'
import { artworkCreateReducer, artworkDeleteReducer, artworkDetailsReducer, artworkListReducer, artworkReviewCreateReducer, artworkTopRatedReducer, artworkUpdateReducer } from '../reducers/artworkReducers'
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignUp: userSignUpReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    artworkList: artworkListReducer,
    artworkDetails: artworkDetailsReducer,
    artworkDelete: artworkDeleteReducer,
    artworkCreate: artworkCreateReducer,
    artworkUpdate: artworkUpdateReducer,
    artworkReviewCreate: artworkReviewCreateReducer,
    artworkTopRated: artworkTopRatedReducer,
    cart: cartReducer,
})
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    :[]
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    :{}
const initialState = {
    cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
    userLogin:{userInfo: userInfoFromStorage}
}

const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
     composeWithDevTools(applyMiddleware(...middleware))
)
export default store