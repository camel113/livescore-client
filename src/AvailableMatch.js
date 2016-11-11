import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import {ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import moment from 'moment'

import Match from './Match';

class AvailableMatch extends Component {

  render() {
    return (
      <ListItem key={1} primaryText={
        <Flexbox flexDirection="row">
          <Flexbox className="time-capsule" flexDirection="column" minWidth="50px">
            <Flexbox className="time">{moment(this.props.time).format("HH:mm")}</Flexbox>
          </Flexbox>
          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
          <Flexbox flexDirection="column" minWidth="30px">
            <div>{<ActionInfo />}</div>
          </Flexbox>
        </Flexbox>
      }/>
    );
  }
}

export default AvailableMatch;