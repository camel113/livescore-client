import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Match from './Match';

class MatchAdmin extends Component {

	fetchData(){
    fetch("http://127.0.0.1:8085/api/matchs/"+this.props.params.matchId)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => console.log("error "+error));
  }

  constructor(props) {
    super(props);
    this.state = {matchId:"",homeT:"",awayT:"",homeS:0,awayS:0,date:"",time:"",goalFormOpen:false};
  }

  componentDidMount() {
    this.fetchData()
  }

  _handleResponse(data){
  	console.log(data)
  	this.setState({homeT:data.homeTeam.name,awayT:data.awayTeam.name})
  }

  toggleGoalForm(){
    this.setState({
      goalFormOpen: !this.state.goalFormOpen
    });
  }

  render() {
    return (
      <Flexbox flexGrow={1} flexDirection="column" className="match-teams" minWidth="0px">
        <Match homeTeam={this.state.homeT} awayTeam={this.state.awayT}/>
        <Button color="secondary" onClick={this.toggleGoalForm.bind(this)}>+ Goal</Button>
        <Modal isOpen={this.state.goalFormOpen} toggle={this.toggleGoalForm.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleGoalForm}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleGoalForm.bind(this)}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleGoalForm.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Flexbox>
    );
  }
}

export default MatchAdmin;