import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import moment from 'moment'

import Match from './Match';
import MatchTime from './MatchTime';

class LiveMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {live: false};
  }

  updateLive(status){
    this.setState({live: status}); 
  }

  render() {
    return (
      <div className="match">
        <Flexbox className={(this.state.live ? 'live' : 'not-live')} flexDirection="row">
          <MatchTime time={this.props.time} live={this.updateLive.bind(this)}/>
          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
          <Flexbox flexDirection="column">
            <Flexbox>0</Flexbox>
            <Flexbox>1</Flexbox>
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

export default LiveMatch;