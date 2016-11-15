import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import LiveMatchsList from './LiveMatchsList';
import AvailableMatchsList from './AvailableMatchsList';
import MyMatchs from './MyMatchs';
import Login from './Login';
import Hello from './Hello';

import AuthService from './utils/AuthService'

console.log(process.env)
const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID,process.env.REACT_APP_AUTH0_DOMAIN);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} auth={auth}>
 			<IndexRoute component={LiveMatchsList}/>
 			<Route path="available" component={AvailableMatchsList} onEnter={requireAuth}/>
 			<Route path="my" component={MyMatchs} onEnter={requireAuth}/>
		 	<Route path="login" component={Login} />
		 	<Route path="hello" component={Hello}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
