import React, { PropTypes } from 'react'

const Hello = ({ logged, onHelloClick }) => {
	console.log("HELLO")
	return (
		<div>
			<button onClick={() => onHelloClick(logged)}>HELLO WORLD</button>
    	<h1>x{logged}x</h1>
    </div>
  )
}

Hello.propTypes = {
  onHelloClick: PropTypes.func.isRequired,
  logged: PropTypes.string.isRequired
}

export default Hello