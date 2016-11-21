export const SET_LOGGIN_INFO = 'SET_LOGGIN_INFO'

export const logginInfos = {
  NOT_CONNECTED: 'NOT_CONNECTED',
  CONNECTED: 'CONNECTED'
}

export function setLogginInfo(info) {
  return { type: SET_LOGGIN_INFO, info }
}