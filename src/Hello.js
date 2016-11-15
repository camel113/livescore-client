import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

class Match extends Component {

  render() {
    return (
      <Flexbox flexGrow={1} flexDirection="column">
        <div>Hello</div>
        <div>World</div>
      </Flexbox>
    );
  }
}

export default Match;