import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

class Score extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flexbox flexDirection="column">
        <Flexbox>{this.props.homeTeamScore}</Flexbox>
        <Flexbox>{this.props.awayTeamScore}</Flexbox>
      </Flexbox>
    );
  }
}

export default Score;