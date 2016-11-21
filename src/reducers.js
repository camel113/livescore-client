import { combineReducers } from 'redux'
import { logginInfos } from './actions'

const { NOT_CONNECTED } = logginInfos

const logginInfo = (state = NOT_CONNECTED, action) => {
	console.log("STATE")
	console.log(state)
	console.log(action.type)
	console.log(action.info)
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