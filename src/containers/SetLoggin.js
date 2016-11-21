import { connect } from 'react-redux'
import { setLogginInfo } from '../actions'
import Hello from '../Hello'

const mapStateToProps = (state, ownProps) => {
  return {
    logged: state.logginInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("HERE")
  console.log(ownProps.logged)
  return {
    onHelloClick: (loggedInfo) => {
      console.log("HEREX")
      console.log(loggedInfo)
      dispatch(setLogginInfo(loggedInfo))
    }
  }
}

const SetLoggin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)

export default SetLoggin