import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import AvailableMatch from './AvailableMatch';

import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

class AvailableMatchsSection extends Component {
  render() {
    return (
    	<ListGroup>
        <ListGroupItem>
          {this.props.region+" "+this.props.league+"e ligue"}
          <ListGroup>
          	{this.props.matchs.map((match) => <AvailableMatch key={match._id} time={match.date} matchId={match._id} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name}/>)}
      		</ListGroup>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default AvailableMatchsSection;