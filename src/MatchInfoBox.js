import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import Match from './Match';
import MatchTime from './MatchTime';
import Score from './Score';

class MatchInfoBox extends Component {

	fetchData(){
    fetch("http://api.footstats.ch/api/matchs/"+this.props.params.matchId)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => console.log("error "+error));
  }

  constructor(props) {
    super(props);
    this.state = {live:false};
  }

  updateLive(status){
    this.setState({live: status}); 
  }

  render() {
    var style = {
      matchBox: {
        padding: "10px 10px 10px 0px"
      },
      live:{
        "borderLeft": "7px solid #C2F970"
      },
      notLive:{
        borderLeft: "7px solid #fff"
      }
    }
    return (
      <Flexbox flexGrow={1} flexDirection="row" style={this.state.live ? Object.assign(style.matchBox, style.live) : Object.assign(style.matchBox, style.notLive)} minWidth="0px">
        <MatchTime time={this.props.time} live={this.updateLive.bind(this)}/>
        <Match homeTeam={this.props.homeT} awayTeam={this.props.awayT}/>
        <Score homeTeamScore={this.props.homeS} awayTeamScore={this.props.awayS} />
      </Flexbox>
    );
  }
}
export default MatchInfoBox;