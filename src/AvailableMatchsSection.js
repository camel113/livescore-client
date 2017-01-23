import React, { Component } from 'react';
import AvailableMatch from './AvailableMatch';
import ArrowUp from 'react-icons/lib/fa/arrow-up';
import ArrowDown from 'react-icons/lib/fa/arrow-down';
import Flexbox from 'flexbox-react';

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
    var listGroupItemStyle = {
      borderRadius: "0"
    }
    var fullWidthContainerStyle = {
      width:"100%"
    }
    var buttonStyle = {
      float:"right"
    }
    let button = null;
    if (this.state.collapse) {
      button = <ArrowDown style={buttonStyle} />
    } else {
      button = <ArrowDown style={buttonStyle} />;
    }
    return (
    	<ListGroup>
        <ListGroupItem style={listGroupItemStyle} onClick={this.toggle}>
            <div style={fullWidthContainerStyle}>{this.props.region+" "+this.props.league+"e ligue"} {button}</div>
            <Collapse style={fullWidthContainerStyle} isOpen={this.state.collapse}>
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