import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import LiveMatchsList from './LiveMatchsList';
import AvailableMatchsList from './AvailableMatchsList';
import MyMatchs from './MyMatchs';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import myApp from './reducers'
import SetLoggin from './containers/SetLoggin'
import IncrementButton from './containers/IncrementButton'

import thunkMiddleware from 'redux-thunk'

console.log(process.env)

// validate authentication for private routes
// const requireAuth = (nextState, replace) => {
//   if (true) {
//     replace({ pathname: '/login' })
//   }
// }
const requireAuth = (nextState, replace) => {
  if(!localStorage.getItem('idToken')){
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
