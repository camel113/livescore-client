import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Divider from 'material-ui/Divider';

class LiveMatch extends Component {
  render() {
    return (
      <div className="match">
        <Divider/>
        <Flexbox flexDirection="row">
          <Flexbox flexDirection="column">
            <Flexbox className="time">22:00</Flexbox>
            <Flexbox></Flexbox>
          </Flexbox>
          <Flexbox flexGrow={1} flexDirection="column" className="teams">
            <Flexbox>{this.props.homeTeam}</Flexbox>
            <Flexbox>{this.props.awayTeam}</Flexbox>
          </Flexbox>
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