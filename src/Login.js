import React from 'react'

const GuestGreeting = (props) => {
  return (
    <div>
      <button onClick={props.login}>
        Login
      </button>
    </div>
  );
}
const UserGreeting = (props) => {
  return (
    <div>
      <button onClick={props.logout}>
        Logout
      </button>
      <h1>{JSON.parse(localStorage.getItem('profile')).name}</h1>
    </div>
  );
}

export class Login extends React.Component {

  render() {
    const { errorMessage, logged } = this.props
    if (logged) {
      return <UserGreeting logout={this.handleLogoutClick.bind(this)}/>;
    }
    return <GuestGreeting login={this.handleClick.bind(this)} />;
  }
  
  handleClick(event) {
    this.props.onLoginClick()
  }

  handleLogoutClick(event) {
    this.props.onLogoutClick()
  }
}

export default Login;

