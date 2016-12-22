import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import moment from 'moment'
import Info from 'react-icons/lib/fa/info-circle';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

import Match from './Match';
import MatchTime from './MatchTime';
import Score from './Score';

class LiveMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {live: false};
  }

  updateLive(status){
    this.setState({live: status}); 
  }

  render() {
    return (
      <div className="match" onClick={()=>this.props.router.push('/live/'+this.props.matchId)}>
        <Flexbox className={(this.state.live ? 'live' : 'not-live')} flexDirection="row">
          <MatchTime time={this.props.time} live={this.updateLive.bind(this)}/>
          <Match homeTeam={this.props.homeTeam.name} awayTeam={this.props.awayTeam.name}/>
          <Score homeTeamScore={this.props.homeTeam.score} awayTeamScore={this.props.awayTeam.score} />
          <Flexbox flexDirection="column" minWidth="30px" alignItems="center" justifyContent="center">
            <Info />
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

LiveMatch.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
export default withRouter(LiveMatch);