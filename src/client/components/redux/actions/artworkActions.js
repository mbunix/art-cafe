import axios from 'axios';  
import {
 ARTWORK_LIST_REQUEST,
 ARTWORK_LIST_FAIL,
 ARTWORK_DETAILS_REQUEST,
 ARTWORK_DETAILS_SUCCESS,
 ARTWORK_DETAILS_FAIL,
 ARTWORK_DELETE_SUCCESS,
 ARTWORK_DELETE_REQUEST,
 ARTWORK_DELETE_FAIL,
 ARTWORK_CREATE_REQUEST,
 ARTWORK_CREATE_SUCCESS,
 ARTWORK_CREATE_FAIL,
 ARTWORK_UPDATE_REQUEST,
 ARTWORK_UPDATE_SUCCESS,
 ARTWORK_UPDATE_FAIL,
 ARTWORK_REVIEW_REQUEST,
 ARTWORK_REVIEW_SUCCESS,
 ARTWORK_REVIEW_FAIL,
 ARTWORK_TOP_REQUEST,
 ARTWORK_TOP_SUCCESS,
 ARTWORK_TOP_FAIL,
} from '../../constants/artworkConstants'
import { logout } from './userActons'

export const listArtwork = (keyword = '', pagenumber = '') => async(dispatch) => {
  try {
    dispatch({ type: ARTWORK_LIST_REQUEST })
    const { data } = await axios.get(
      `/api/artworks?keywork=${keyword} &pagenumber= ${pagenumber}`
    )
    dispatch({
      type: ARTWORK_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ARTWORK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// get the artwork details 
export const listArtWorkDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ARTWORK_DETAILS_REQUEST, })
    const { data } = await axios.get(`api/artworks/${id}`)
    dispatch({
      type: ARTWORK_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ARTWORK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// delete the artwork 
export const deleteArtwork = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTWORK_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`api/artworks/${id}`, config)
    dispatch({
      type: ARTWORK_DELETE_SUCCESS,
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
      type: ARTWORK_DELETE_FAIL,
      payload: message,
    })
  }
}

// create the artwork
export const createArtwork  =()=> async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTWORK_CREATE_REQUEST,
    })
    const {
          userLogin: { userInfo },
    } = getState()
    const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
    }
    const { data } = await axios.post('api/artworks', {}, config)
    dispatch({
          type: ARTWORK_CREATE_SUCCESS,
          payload: data,
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
      type: ARTWORK_CREATE_FAIL,
      payload: message,
    })
  }
} 
//update the existing artwork

export const updateArtwork = (artwork) => async (dispatch, getState) => { 
  try {
    dispatch({
      type: ARTWORK_UPDATE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`api/artworks/${artwork._id}`, artwork, config)
    dispatch({
      type: ARTWORK_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({type:ARTWORK_DETAILS_SUCCESS, payload: data})
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ARTWORK_UPDATE_FAIL,
      payload: message,
    })
  }
}
export const createArtReview = (ArtworkId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ARTWORK_REVIEW_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.post(`/api/artworks/${ArtworkId}/reviews`, review, config)
      dispatch({
        type: ARTWORK_REVIEW_SUCCESS,
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
        type: ARTWORK_REVIEW_FAIL,
        payload: message,
      })
    }
}
export const listTopArtwork = () => async (dispatch, getState) => { 
  try {
    dispatch({
      type: ARTWORK_TOP_REQUEST
    })
    if (!getState().artwork.artworkTop) {
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/artworks/top`, config)
      dispatch({
        type: ARTWORK_TOP_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({ type: ARTWORK_TOP_FAIL})
    }
  } catch {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
  }
}
