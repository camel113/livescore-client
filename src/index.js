import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import LiveMatchsList from './LiveMatchsList';
import AvailableMatchsList from './AvailableMatchsList';

import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
 			<IndexRoute component={LiveMatchsList}/>
 			<Route path="available" component={AvailableMatchsList} />
    </Route>
  </Router>,
  document.getElementById('root')
);
