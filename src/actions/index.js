import Auth0Lock from 'auth0-lock'
export const SET_LOGGIN_INFO = 'SET_LOGGIN_INFO'

export const logginInfos = {
  NOT_CONNECTED: 'NOT_CONNECTED',
  CONNECTED: 'CONNECTED'
}

export function setLogginInfo(info) {
  return { type: SET_LOGGIN_INFO, info }
}




export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 2000);
  };
}

// function incrementAsync() {
//   return dispatch => {
//     setTimeout(() => {
//       // Yay! Can invoke sync or async actions with `dispatch`
//       dispatch(increment());
//     }, 1000);
//   };
// }
// There are two possible states for our login
// process and we need actions for each of them.
//
// We also need one to show the Lock widget.
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'

function showLock() {
  return {
    type: SHOW_LOCK
  }
}

function lockSuccess(profile, token) {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
}

function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Opens the Lock widget and
// dispatches actions along the way
export function login() {
	console.log("login()")
  const lock = new Auth0Lock('PQHzFSu9u8r1k0HUU9KL4NbOESfrqQhl', 'camel113.eu.auth0.com',{auth:{redirect:false}});
  return dispatch => {
  	lock.show()
  	lock.on('authenticated', function(authResult){
  		console.log("AUH")
  		localStorage.setItem('idToken', authResult.idToken);
  		dispatch(lockSuccess(authResult.profile, authResult.token))
  	})
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('idToken')
    dispatch(receiveLogout())
  }
}