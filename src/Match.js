import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

class Match extends Component {

  render() {
  	var teamNameStyle = {
      whiteSpace: "nowrap",
  		overflow: "hidden",
  		textOverflow: "ellipsis"
    }
    return (
      <Flexbox flexGrow={1} flexDirection="column" minWidth="0px">
        <div style={teamNameStyle}>{this.props.homeTeam}</div>
        <div style={teamNameStyle}>{this.props.awayTeam}</div>
      </Flexbox>
    );
  }
}

export default Match;