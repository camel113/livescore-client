import { combineReducers } from 'redux'
import { SET_LOGGIN_INFO, LOGGIN_INFO } from './actions'

const { NOT_CONNECTED } = logginInfos

const logginInfo = (state = NOT_CONNECTED, action) => {
  switch (action.type) {
    case 'SET_LOGGIN_INFO':
      return action.info
    default:
      return state
  }
}

const myApp = combineReducers({
  logginInfo
})

export default myApp