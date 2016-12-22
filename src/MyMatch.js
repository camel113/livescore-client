import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import moment from 'moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Router, Route, Link, browserHistory } from 'react-router'
import Pencil from 'react-icons/lib/fa/pencil';
import { withRouter } from 'react-router';

import Match from './Match';
import MatchTime from './MatchTime';
import Score from './Score';

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
    return (
      <div className="match">
        <Flexbox minWidth="55px" className={(this.state.live ? 'live' : 'not-live')} flexDirection="row" onClick={()=>this.props.router.push('/my/'+this.props.matchId)}>
          <MatchTime time={this.props.time} live={this.updateLive.bind(this)}/>
          <Match homeTeam={this.props.homeTeam} awayTeam={this.props.awayTeam}/>
          <Score homeTeamScore={this.props.homeTeamScore} awayTeamScore={this.props.awayTeamScore} />
          <Flexbox flexDirection="column" minWidth="30px" alignItems="center" justifyContent="center">
            <Pencil />
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

MyMatch.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
export default withRouter(MyMatch);