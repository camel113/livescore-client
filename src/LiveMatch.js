import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Divider from 'material-ui/Divider';
import moment from 'moment'

class LiveMatch extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  matchIsToday(matchDate){
    var dateNow = Date.now();
    return (moment(dateNow).diff(matchDate) == 0)
  }
  computeTime(matchDate){
    var dateNow = Date.now();
    var minutes = moment(dateNow).diff(matchDate, 'minutes')
    if(minutes <= 45){
      return moment(dateNow).diff(matchDate, 'minutes')
    } else
    if(minutes > 45 && minutes < 48){ // First half additional time (3')
      return 45
    } else
    if(minutes >= 48 && minutes < 63){ // Half-time
      return "MT"
    } else
    if(minutes >= 63 && minutes <= 108 ){ // Second half
      return moment(dateNow).diff(matchDate, 'minutes')-18 // Substract 18 minutes (additional time + half time => 3 + 15)
    } else
    if(minutes > 108 && minutes <= 112 ){ // Half-time
      return 90
    }
  }

  render() {
    return (
      <div className="match">
        <Divider/>
        <Flexbox flexDirection="row">
          <Flexbox flexDirection="column">
            <Flexbox className="time">{moment(this.props.time).format("HH:mm")}</Flexbox>
            <Flexbox className="duration">{this.computeTime(this.props.time)}</Flexbox>
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

function TimeBox(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default LiveMatch;