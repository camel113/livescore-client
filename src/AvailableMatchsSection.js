import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import AvailableMatch from './AvailableMatch';

import { ListGroup, ListGroupItem, Collapse } from 'reactstrap';

class AvailableMatchsSection extends Component {

	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
    	<ListGroup>
        <ListGroupItem onClick={this.toggle}>
          {this.props.region+" "+this.props.league+"e ligue"}
          <Collapse isOpen={this.state.collapse}>
          	<ListGroup >
          		{this.props.matchs.map((match) => <AvailableMatch key={match._id} time={match.date} matchId={match._id} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name}/>)}
      			</ListGroup>
      		</Collapse>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default AvailableMatchsSection;