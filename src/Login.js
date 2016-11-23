import React from 'react'
// import AuthService from './utils/AuthService'
// import RaisedButton from 'material-ui/RaisedButton';


export class Login extends React.Component {
  
  render() {
    const { errorMessage, logged } = this.props
    return (
      <div>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
        <button onClick={(event) => this.handleLogoutClick(event)} className="btn btn-primary">
          Logout
        </button>
        <h1></h1>
        <h1>{logged.toString()}</h1>
        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
      </div>
    )
  }
  
  handleClick(event) {
    this.props.onLoginClick()
  }

  handleLogoutClick(event) {
    this.props.onLogoutClick()
  }
}

export default Login;

