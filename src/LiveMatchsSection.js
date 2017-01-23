import React, { Component } from 'react';
import LiveMatch from './LiveMatch';

class LiveMatchsSection extends Component {
  render() {
  	var sectionTitleStyle = {
      backgroundColor: "#8D99AE",
      margin: "0",
      padding: "5px",
      color: "#EDF2F4"
    }
    return (
      <section className="live-match-section" key="{this.props.key}">
        <h1 style={sectionTitleStyle}>{this.props.region} {this.props.league}e ligue</h1>
        {this.props.matchs.map((match) => <LiveMatch key={match._id} matchId={match._id} time={match.date} homeTeam={match.homeTeam} awayTeam={match.awayTeam}/>)}
      </section>
    );
  }
}

export default LiveMatchsSection;