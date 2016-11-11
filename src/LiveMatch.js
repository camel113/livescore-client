import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Divider from 'material-ui/Divider';
import moment from 'moment'

import Match from './Match';

class LiveMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {duration: -1, live: false};
    // this.time = props.time
  }

  componentDidMount() {
    setInterval(
      () => this.computeTime(this.props.time),
      1000
    );
  }

  computeTime(matchDate){
    var dateNow = Date.now();
    var minutes = moment(dateNow).diff(matchDate, 'minutes')
    if(minutes < 0){
      this.setState({duration:moment(matchDate).format("HH:mm")})
    } else
    if(minutes >= 0 && minutes <= 45){
      this.setState({duration:moment(dateNow).diff(matchDate, 'minutes'),live:true})
    } else
    if(minutes > 45 && minutes < 48){ // First half additional time (3')
      this.setState({duration:45,live:true})
    } else
    if(minutes >= 48 && minutes < 63){ // Half-time
      this.setState({duration:"MT",live:true})
    } else
    if(minutes >= 63 && minutes <= 108 ){ // Second half
      this.setState({duration:moment(dateNow).diff(matchDate, 'minutes')-18,live:true}) // Substract 18 minutes (additional time + half time => 3 + 15)
    } else
    if(minutes > 108 && minutes <= 112 ){ // Half-time
      this.setState({duration:90,live:true})
    }
    if(minutes > 112){ // Half-time
      this.setState({duration:"Fini"})
    }
  }

  render() {
    return (
      <div className="match">
        <Divider/>
        <Flexbox className={(this.state.live ? 'live' : 'not-live')} flexDirection="row">
          <Flexbox className="time-capsule" flexDirection="column" width="50px">
            <Flexbox className="time">{this.state.duration}</Flexbox>
          </Flexbox>
          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
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