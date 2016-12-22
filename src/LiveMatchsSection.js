import React, { Component } from 'react';
import LiveMatch from './LiveMatch';

class LiveMatchsSection extends Component {
  render() {
    return (
      <section className="live-match-section" key="{this.props.key}">
        <h1>{this.props.region} {this.props.league}e ligue</h1>
        {this.props.matchs.map((match) => <LiveMatch key={match._id} matchId={match._id} time={match.date} homeTeam={match.homeTeam} awayTeam={match.awayTeam}/>)}
      </section>
    );
  }
}

export default LiveMatchsSection;