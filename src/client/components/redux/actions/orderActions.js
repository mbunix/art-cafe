import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../../constants/cartConstants '
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from '../../constants/orderConstants'
import { logout } from '../actions/userActons'

//create a new order

export const createOrder = (order) => async (dispatch,getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.post('/api/orders', order,config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload:data
        })
        localStorage.removeItem('cartItems')
    } catch (error) {
        const message = 
            error.response && error.response.data.message
        ? error.response.data.message
                : error.message
        if (message == 'No authorized,tocken failed') { 
            dispatch(logout())
        }

        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:data
        })
    }
}

//get order details

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`/api/orders/${id}`,config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
               ? error.response.data.message
                : error.message
        if (message == 'Not authorized,tocken failed') { 
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:data
        })
    }
}

//pay order

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })
                const {
                    userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${orderId}/pay`
        ,paymentResult,
        config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized,tocken failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:message
        })
    }
}
// deliver the order

export const deliverOrder = (id) => async (dispatch,getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/deliver`)

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized,tocken failed') {
            dispatch(logout())
        }

        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:message
             
        })
    }
}
//list the orders of a user 

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/myorders`)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized,tocken failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: message
        })
    }
}

//list all orders

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders`)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
        dispatch(logout())
        }

        dispatch({
            type: ORDER_LIST_FAIL,
            payload:message
        })
    }
}
