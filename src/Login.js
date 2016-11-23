import React from 'react'
// import RaisedButton from 'material-ui/RaisedButton';


// export class Login extends React.Component {
//   if (isLoggedIn) {
//     return <UserGreeting />;
//   }
//   return <GuestGreeting />;
//   render() {
//     const { errorMessage, logged } = this.props
//     return (
//       <div>
//         <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
//           Login
//         </button>
//         <button onClick={(event) => this.handleLogoutClick(event)} className="btn btn-primary">
//           Logout
//         </button>
//         <h1></h1>
//         <h1>{logged.toString()}</h1>
//         {errorMessage &&
//           <p style={{color:'red'}}>{errorMessage}</p>
//         }
//       </div>
//     )
//   }
  
//   handleClick(event) {
//     this.props.onLoginClick()
//   }

//   handleLogoutClick(event) {
//     this.props.onLogoutClick()
//   }
// }

function GuestGreeting(props) {
  return (
    <div>
      <button onClick={props.login}>
        Login
      </button>
    </div>
  );
}

function UserGreeting(props) {
  return (
    <div>
      <button onClick={props.logout}>
        Logout
      </button>
    </div>
  );
}

export class Login extends React.Component {

  render() {
    const { errorMessage, logged } = this.props
    console.log(this.props)
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

