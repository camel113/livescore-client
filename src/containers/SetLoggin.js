import { connect } from 'react-redux'
import { setLogginInfo } from '../actions'
import { login,logoutUser} from '../actions'
import { Login} from '../Login'

const mapStateToProps = (state, ownProps) => {
  return {
    logged: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoginClick: () => {
      dispatch(login())
    },
    onLogoutClick: () => {
      dispatch(logoutUser())
    }
  }
}

const SetLoggin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)




export default SetLoggin