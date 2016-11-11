import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import AvailableMatch from './AvailableMatch';

class AvailableMatchsSection extends Component {
  render() {
    return (
    	<ListItem primaryText={this.props.region+" "+this.props.league+"e ligue"} primaryTogglesNestedList={true} initiallyOpen={true} nestedItems={this.props.matchs.map((match) => <AvailableMatch key={match._id} time={match.date} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name}/>)} />
    );
  }
}

export default AvailableMatchsSection;