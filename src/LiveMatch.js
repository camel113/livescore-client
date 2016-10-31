import React, { Component } from 'react';

class LiveMatch extends Component {
  render() {
    return (
      <div className="LiveMatch" key="{this.props.key}">
        <div className="LiveMatch-time">
          <h2>{this.props.time}</h2>
        </div>
        <div className="LiveMatch-homeTeam">
          {this.props.homeTeam}
        </div>
        <div className="LiveMatch-AwayTeam">
          {this.props.awayTeam}
        </div>
      </div>
    );
  }
}

export default LiveMatch;