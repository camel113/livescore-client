import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import LiveMatchsList from './LiveMatchsList';
import AvailableMatchsList from './AvailableMatchsList';
import MyMatchs from './MyMatchs';
// import Login from './Login';
// import Hello from './Hello';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import myApp from './reducers'
import SetLoggin from './containers/SetLoggin'
import IncrementButton from './containers/IncrementButton'

import thunkMiddleware from 'redux-thunk'
// import AuthService from './utils/AuthService'

console.log(process.env)
// const auth = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID,process.env.REACT_APP_AUTH0_DOMAIN);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (true) {
    replace({ pathname: '/login' })
  }
}



import './index.css';

injectTapEventPlugin();

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let store = createStoreWithMiddleware(myApp)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
   			<IndexRoute component={LiveMatchsList}/>
   			<Route path="available" component={AvailableMatchsList} onEnter={requireAuth}/>
   			<Route path="my" component={MyMatchs} onEnter={requireAuth}/>
  		 	<Route path="login" component={SetLoggin} />
  		 	<Route path="setLoggin" component={SetLoggin}/>
        <Route path="inc" component={IncrementButton}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
