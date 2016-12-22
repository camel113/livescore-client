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
import MatchTime from './MatchTime';

class MyMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {duration: -1, live: false, snackGoalAddOpen:false, goalFormOpen:false};
  }

  componentDidMount() {
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

  updateLive(status){
    this.setState({live: status}); 
  }

  render() {
    const cancelGoalFormAction = <FlatButton label="Annuler" primary={true} onTouchTap={this.hideGoalForm.bind(this)}/>
    return (
      <div className="match">
        <Flexbox className={(this.state.live ? 'live' : 'not-live')} flexDirection="row">
          <MatchTime time={this.props.time} live={this.updateLive.bind(this)}/>
          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
          <Flexbox flexDirection="column">
            <div>{this.props.homeTeamScore}</div>
            <div>{this.props.awayTeamScore}</div>
          </Flexbox>
          <Flexbox flexDirection="column" minWidth="30px">
            <Link to={'/my/'+this.props.matchId}>Link</Link>
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

export default MyMatch;