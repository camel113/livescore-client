import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

class Match extends Component {

  render() {
    return (
      <Flexbox flexGrow={1} flexDirection="column" className="match-teams" minWidth="0px">
        <div>{this.props.homeTeam}</div>
        <div>{this.props.awayTeam}</div>
      </Flexbox>
    );
  }
}

export default Match;