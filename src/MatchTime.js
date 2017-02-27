import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import moment from 'moment'

import Match from './Match';

class LiveMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {duration: "",futur:"",computed:false};
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.computeTime(this.props.time),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  computeTime(matchDate){
    this.state.computed = true
    var dateNow = Date.now();
    var minutes = moment(dateNow).diff(matchDate, 'minutes')
    if(minutes < 0){
      this.setState({duration:moment(matchDate).format("HH:mm"),futur:moment(matchDate).format("DD/MM")})
      this.props.live(false)
    } else
    if(minutes >= 0 && minutes <= 45){
      this.setState({duration:moment(dateNow).diff(matchDate, 'minutes')})
      this.props.live(true)
    } else
    if(minutes > 45 && minutes < 48){ // First half additional time (3')
      this.setState({duration:45})
      this.props.live(true)
    } else
    if(minutes >= 48 && minutes < 63){ // Half-time
      this.setState({duration:"MT"})
      this.props.live(true)
    } else
    if(minutes >= 63 && minutes <= 108 ){ // Second half
      this.setState({duration:moment(dateNow).diff(matchDate, 'minutes')-18}) // Substract 18 minutes (additional time + half time => 3 + 15)
      this.props.live(true)
    } else
    if(minutes > 108 && minutes <= 112 ){ // Half-time
      this.setState({duration:90})
      this.props.live(true)
    }
    if(minutes > 112){ // Half-time
      this.setState({duration:"Fini"})
      this.props.live(false)
    }
  }

  render() {
    var style = {
      dateVisible: {
        display:"block"
      },
      dateInvisible:{
        display:"none",
      },
      timeStyle:{
        fontSize: "0.8em",
        fontStyle: "italic"
      },
      durationStyle:{
        fontSize: "1em",
        fontStyle: "normal"
      },
      timeCapsule:{
        alignItems: "center",
        justifyContent: "center"
      }
    }
    const computed = this.state.computed
    return (
      <Flexbox style={style.timeCapsule} flexDirection="column" minWidth="50px">
        {computed == true &&
          <div>
            <div style={(this.state.futur != "" ? Object.assign(style.timeStyle, style.dateVisible) : style.dateInvisible)}>{this.state.futur}</div>
            <div style={(this.state.duration != "" && this.state.futur == "" ? style.durationStyle : style.timeStyle)} className="time">{this.state.duration}</div>
          </div>
        }
        {computed == false &&
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        }
      </Flexbox>
    );
  }
}



export default LiveMatch;