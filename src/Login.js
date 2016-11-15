import React, { PropTypes as T } from 'react'
import AuthService from './utils/AuthService'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
};

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    console.log(auth.loggedIn())
    return (
      <div>
        <h2>Vous devez être connecté pour accéder à vos matchs et aux matchs disponibles.</h2>
        <div>
          <RaisedButton label="Login" style={style} onClick={auth.login.bind(this)} />
          <RaisedButton label="Logout" style={style} onClick={auth.logout.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Login;