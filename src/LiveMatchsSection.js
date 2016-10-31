import React, { Component } from 'react';
import LiveMatch from './LiveMatch';

class LiveMatchsSection extends Component {
  render() {
    return (
      <div className="LiveMatchsSection" key="{this.props.key}">
        <p>{this.props.region} {this.props.league}</p>
        {this.props.matchs.map((match) => <LiveMatch key={match._id} time={match.date} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name}/>)}
      </div>
    );
  }
}

export default LiveMatchsSection;