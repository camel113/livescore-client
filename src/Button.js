import React, { PropTypes } from 'react'

const Button = ({ value, onButtonPress, onAsyncButtonPress }) => {
	console.log("HELLO")
	return (
		<div>
			// <button onClick={() => onButtonPress()}>Press to incrment</button>
			// <button onClick={() => onAsyncButtonPress()}>Press to incrment async</button>
    	<h1>{value}</h1>
    </div>
  )
}

Button.propTypes = {
  onButtonPress: PropTypes.func.isRequired,
  onAsyncButtonPress: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default Button