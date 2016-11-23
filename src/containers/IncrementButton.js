import { connect } from 'react-redux'
import { increment, incrementAsync } from '../actions'
import Button from '../Button'

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.incrementx
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onButtonPress: () => {
      dispatch(increment())
    },
    onAsyncButtonPress: () => {
      dispatch(incrementAsync())
    }
  }
}

const IncrementButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)




export default IncrementButton