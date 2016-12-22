import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import LiveMatchsList from './LiveMatchsList';
import AvailableMatchsList from './AvailableMatchsList';
import MyMatchs from './MyMatchs';
import MatchAdmin from './MatchAdmin';
import LiveMatchDetails from './LiveMatchDetails';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import myApp from './reducers'
import SetLoggin from './containers/SetLoggin'
import IncrementButton from './containers/IncrementButton'
import { isTokenExpired } from './utils/jwtHelper'

import thunkMiddleware from 'redux-thunk'

console.log(process.env)

const requireAuth = (nextState, replace) => {
  if(!localStorage.getItem('idToken') || isTokenExpired(localStorage.getItem('idToken'))){
    replace({ pathname: '/login' })
  }
}


import './index.css';

injectTapEventPlugin();

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let store = createStoreWithMiddleware(myApp)

console.log(store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
   			<IndexRoute component={LiveMatchsList}/>
        <Route path="/:matchId" component={LiveMatchDetails}/>
   			<Route path="available" component={AvailableMatchsList} />
        <Route path="my" component={MyMatchs} onEnter={requireAuth}/>
        <Route path="/my/:matchId" component={MatchAdmin}/>
  		 	<Route path="login" component={SetLoggin} />
  		 	<Route path="setLoggin" component={SetLoggin}/>
        <Route path="inc" component={IncrementButton}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
