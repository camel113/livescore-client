import { combineReducers } from 'redux'
import { logginInfos } from './actions'

const { NOT_CONNECTED } = logginInfos

const logginInfo = (state = NOT_CONNECTED, action) => {
  switch (action.type) {
    case 'SET_LOGGIN_INFO':
      return action.info
    default:
      return state
  }
}

import { INCREMENT_COUNTER } from './actions'

const incrementx = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return state+1
    default:
      return state
  }
}

import {
  LOCK_SUCCESS, LOGOUT_SUCCESS
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
	console.log(state)
  switch (action.type) {
    case LOCK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
    }
}

const myApp = combineReducers({
	incrementx,
	auth,
  logginInfo
})

export default myApp