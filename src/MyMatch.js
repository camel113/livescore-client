import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Divider from 'material-ui/Divider';
import moment from 'moment'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Router, Route, Link, browserHistory } from 'react-router'

import Match from './Match';

class MyMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {duration: -1, live: false, futur:"", snackGoalAddOpen:false, goalFormOpen:false};
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

  toggleGoalForm(){
    this.setState({
      goalFormOpen: !this.state.goalFormOpen
    });
  }
  addGoalToTeam(team){
    this.setState({goalFormOpen: true}); 
  }

  postGoalData(team){
    console.log("%%%%")
    fetch('http://127.0.0.1:8085/api/matchs/'+this.props.matchId, {
      method: 'PUT', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+localStorage.getItem('idToken')
      },
      body: JSON.stringify({
        info: "goal",
        team: team
      })
    })
    .then(response => response.json())
    .then(json => this._handleAddGoalResponse(json))
    .catch(error => this.showError(error));
  }

  _handleAddGoalResponse(json){
    if(json.updated == true){
      this.showSnackGoalAdd()
    }else{
      console.log("Fail")
    }
  };

  showError(e){
    console.log(e)
  }

  showSnackGoalAdd(){
    this.setState({snackGoalAddOpen: true});
  }

  hideSnackGoalAdd(){
    this.setState({snackGoalAddOpen: false});
  }

  hideGoalForm(){
    this.setState({goalFormOpen: false}); 
  }

  computeTime(matchDate){
    var dateNow = Date.now();
    var minutes = moment(dateNow).diff(matchDate, 'minutes')
    if(minutes < 0){
      this.setState({duration:moment(matchDate).format("HH:mm"),live:false,futur:moment(matchDate).format("DD/MM")})
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
      this.setState({duration:"Fini",live:false})
    }
  }

  render() {
    const cancelGoalFormAction = <FlatButton label="Annuler" primary={true} onTouchTap={this.hideGoalForm.bind(this)}/>
    return (
      <div className="match">
        <Flexbox className={(this.state.live ? 'live' : 'not-live')} flexDirection="row">
          <Flexbox className="time-capsule" flexDirection="column" width="50px">
            <div className={(this.state.futur != "" ? 'visible' : 'hidden')}>{this.state.futur}</div>
            <div className="time">{this.state.duration}</div>
          </Flexbox>
          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
          <Flexbox flexDirection="column">
            <div>{this.props.homeTeamScore}</div>
            <div>{this.props.awayTeamScore}</div>
          </Flexbox>
          <Flexbox flexDirection="column" minWidth="30px">
            <Link to={'/my/'+this.props.matchId}>{this.props.matchId}</Link>
          </Flexbox>
        </Flexbox>
        <Snackbar
          open={this.state.snackGoalAddOpen}
          message="Le but a bien été sauvegardé"
          autoHideDuration={4000}
          onRequestClose={this.hideSnackGoalAdd.bind(this)}
        />
      </div>
    );
  }
}

export default MyMatch;