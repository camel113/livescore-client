import React from 'react'
import { isTokenExpired } from './utils/jwtHelper'
import { Button } from 'reactstrap';
import Flexbox from 'flexbox-react';

const infoStyle = {
  textAlign: 'center',
  padding: "0 10px"
};

const GuestGreeting = (props) => {
  return (
    <div>
      <Flexbox minHeight="100px" style={infoStyle} justifyContent="center" alignItems="center">Tu dois être connecté pour reporter le score d'un ou plusieurs matchs</Flexbox>
      <Flexbox justifyContent="center"><Button color="primary" onClick={props.login}>Se connecter</Button></Flexbox>
    </div>
  );
}
const UserGreeting = (props) => {
  return (
    <div>
      <Flexbox minHeight="200px" style={infoStyle} justifyContent="center" alignItems="center">
        Tu es actuellement connecté.<br/> Tu peux maintenant choisir de reporter un match ou gérer les matchs dont tu es le reporter
      </Flexbox>
      <Flexbox justifyContent="center"><Button color="danger" onClick={props.logout}>Se déconnecter</Button></Flexbox>
    </div>
  );
}

export class Login extends React.Component {

  componentWillMount(){
    var token = localStorage.getItem("idToken")
    if(token != undefined && !isTokenExpired(token)){
    }else{
      this.handleLogoutClick()
    }
  }

  render() {
    var token = localStorage.getItem("idToken")
    if(token != undefined && !isTokenExpired(token)){
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