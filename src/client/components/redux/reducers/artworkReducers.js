import {
 ARTWORK_LIST_REQUEST,
 ARTWORK_LIST_SUCCESS,
 ARTWORK_LIST_FAIL,
 ARTWORK_DETAILS_REQUEST,
 ARTWORK_DETAILS_SUCCESS,
 ARTWORK_DETAILS_FAIL,
 ARTWORK_DELETE_REQUEST,
 ARTWORK_DELETE_SUCCESS,
 ARTWORK_DELETE_FAIL,
 ARTWORK_CREATE_RESET,
 ARTWORK_CREATE_FAIL,
 ARTWORK_CREATE_SUCCESS,
 ARTWORK_CREATE_REQUEST,
 ARTWORK_UPDATE_REQUEST,
 ARTWORK_UPDATE_SUCCESS,
 ARTWORK_UPDATE_FAIL,
 ARTWORK_UPDATE_RESET,
 ARTWORK_REVIEW_REQUEST,
 ARTWORK_REVIEW_SUCCESS,
 ARTWORK_REVIEW_FAIL,
 ARTWORK_REVIEW_RESET,
 ARTWORK_TOP_REQUEST,
 ARTWORK_TOP_SUCCESS,
 ARTWORK_TOP_FAIL
} from '../../constants/artworkConstants'

export const artworkListReducer = (state = {ARTWORKs: [] }, action) => {
  switch (action.type) {
    case ARTWORK_LIST_REQUEST:
      return { loading: true,artwork: [] }
    case ARTWORK_LIST_SUCCESS:
      return {
        loading: false,
        artwork: action.payload.artwork,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case ARTWORK_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const artworkDetailsReducer = (
  state = {ARTWORK: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ARTWORK_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ARTWORK_DETAILS_SUCCESS:
      return { loading: false,artwork: action.payload }
    case ARTWORK_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const artworkDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTWORK_DELETE_REQUEST:
      return { loading: true }
    case ARTWORK_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ARTWORK_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const artworkCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTWORK_CREATE_REQUEST:
      return { loading: true }
    case ARTWORK_CREATE_SUCCESS:
      return { loading: false, success: true,artwork: action.payload }
    case ARTWORK_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ARTWORK_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const artworkUpdateReducer = (state = {artwork: {} }, action) => {
  switch (action.type) {
    case ARTWORK_UPDATE_REQUEST:
      return { loading: true }
    case ARTWORK_UPDATE_SUCCESS:
      return { loading: false, success: true,artwork: action.payload }
    case ARTWORK_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ARTWORK_UPDATE_RESET:
      return {ARTWORK: {} }
    default:
      return state
  }
}

export const artworkReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTWORK_REVIEW_REQUEST:
      return { loading: true }
    case ARTWORK_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case ARTWORK_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case ARTWORK_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const artworkTopRatedReducer = (state = {artwork: [] }, action) => {
  switch (action.type) {
    case ARTWORK_TOP_REQUEST:
      return { loading: true,artwork: [] }
    case ARTWORK_TOP_SUCCESS:
      return { loading: false,artwork: action.payload }
    case ARTWORK_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
