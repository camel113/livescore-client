import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Divider from 'material-ui/Divider';
import moment from 'moment'

class LiveMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {duration: -1, live: false};
    // this.time = props.time
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="match">
        <Divider/>
        <Flexbox className={(this.props.showBulkActions ? 'show' : 'hidden')} flexDirection="row">
          <TimeBox time={this.props.time}/>
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

class TimeBox extends Component{

  constructor(props) {
    super(props);
    this.state = {duration: -1};
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
      this.setState({duration:moment(dateNow).diff(matchDate, 'minutes')})
    } else
    if(minutes > 45 && minutes < 48){ // First half additional time (3')
      this.setState({duration:45})
    } else
    if(minutes >= 48 && minutes < 63){ // Half-time
      this.setState({duration:"MT"})
    } else
    if(minutes >= 63 && minutes <= 108 ){ // Second half
      this.setState({duration:moment(dateNow).diff(matchDate, 'minutes')-18}) // Substract 18 minutes (additional time + half time => 3 + 15)
    } else
    if(minutes > 108 && minutes <= 112 ){ // Half-time
      this.setState({duration:90})
    }
    if(minutes > 112){ // Half-time
      this.setState({duration:"Fini"})
    }
  }

  render(){
    return (
      <Flexbox flexDirection="column">
        <Flexbox className="duration">{this.state.duration}</Flexbox>
      </Flexbox>
    )
  }
}



export default LiveMatch;