import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { isTokenExpired } from './utils/jwtHelper'
import moment from 'moment'

import Match from './Match';
import MatchTime from './MatchTime';

class MatchAdmin extends Component {

	fetchData(){
    fetch("http://127.0.0.1:8085/api/matchs/"+this.props.params.matchId)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => console.log("error "+error));
  }

  constructor(props) {
    super(props);
    this.state = {matchId:"",homeT:"",awayT:"",homeS:0,awayS:0,date:"",time:"",goalFormOpen:false,live:false,errorModalOpen:false,goals:[],unscubscribeModalOpen:false,unscubscribeImpossibleModalOpen:false};
  }

  componentDidMount() {
    this.fetchData()
  }

  _handleResponse(data){
  	console.log(data)
  	this.setState({homeT:data.homeTeam.name,awayT:data.awayTeam.name,time:data.date,goals:data.goals})
  }

  toggleGoalForm(){
    this.setState({
      goalFormOpen: !this.state.goalFormOpen
    });
  }

  toggleErrorModal(){
    this.setState({
      goalFormOpen: !this.state.goalFormOpen
    });
    this.setState({
      errorModalOpen: !this.state.errorModalOpen
    });
  }

  toggleUnscubscribeModal(){
    this.setState({
      unscubscribeModalOpen: !this.state.unscubscribeModalOpen
    });
  }

  toggleUnscubscribeImpossibleModal(){
    this.setState({
      unscubscribeImpossibleModalOpen: !this.state.unscubscribeImpossibleModalOpen
    });
  }

  updateLive(status){
    this.setState({live: status}); 
  }

  postGoalData(){
    var teamSelect = document.getElementById("teamSelect");
    var teamSelected = teamSelect.options[teamSelect.selectedIndex].value;
    var timeSelect = document.getElementById("timeSelect");
    var timeSelected = timeSelect.options[timeSelect.selectedIndex].value;
    var playerName = document.getElementById("playerName").value;
    
    fetch('http://127.0.0.1:8085/api/matchs/'+this.props.params.matchId, {
      method: 'PUT', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+localStorage.getItem('idToken')
      },
      body: JSON.stringify({
        info: "goal",
        team: teamSelected,
        scorer: playerName,
        time: timeSelected
      })
    })
    .then(response => response.json())
    .then(json => this._handleAddGoalResponse(json))
    .catch(error => this.toggleErrorModal());
  }

  _handleAddGoalResponse(json){
    if(json.updated == true){
      console.log(json.goals)
      this.updateGoalsList(json.goals)
      this.toggleGoalForm()
    }else{
      this.toggleErrorModal()
    }
  };

  updateGoalsList(goals){
    console.log(goals)
    this.setState({goals: goals});
  }

  checkIfUnscubscribeIsPossible(){
    var minutes = moment(Date.now()).diff(this.state.time, 'minutes')
    if(minutes < 0){
      this.toggleUnscubscribeModal()
    }else{
      this.toggleUnscubscribeImpossibleModal()
    }
  }

  unsubscribe(){
    fetch('http://127.0.0.1:8085/api/matchs/'+this.props.params.matchId, {
      method: 'PUT', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+localStorage.getItem('idToken')
      },
      body: JSON.stringify({
        info: "unsubscribe"
      })
    })
    .then(response => response.json())
    .then(json => this._handleUnsubscribeResponse(json))
    .catch(error => this.toggleErrorModal());
  }

  _handleUnsubscribeResponse(json){
    if(json.updated == true){
      this.props.router.push('/live/'+this.props.params.matchId)
    }else{
      this.toggleErrorModal()
    }
  }

  createTimeOptions(){
    var options = []
    for (var i=1; i <= 90; i++) {
      options.push(<option key={i}>{i}</option>)
    }
    return options
  }

  render() {
    return (
      <section>
        <Flexbox flexGrow={1} flexDirection="row" className={(this.state.live ? 'live' : 'not-live')} minWidth="0px">
          <MatchTime time={this.state.time} live={this.updateLive.bind(this)}/>
          <Match homeTeam={this.state.homeT} awayTeam={this.state.awayT}/>
        </Flexbox>
        <Flexbox>
          <Button color="secondary" onClick={this.toggleGoalForm.bind(this)}>+ 1 Goal</Button>
          <Button color="secondary" onClick={this.checkIfUnscubscribeIsPossible.bind(this)}>Se désinscrire</Button>
        </Flexbox>
        <Table>
          <tbody>
            {this.state.goals.map((goal) => <tr key={goal._id}><td>{goal.time}</td><td>{goal.score}</td><td>{goal.scorer}</td></tr>)}
          </tbody>
        </Table>
        <Modal isOpen={this.state.goalFormOpen} toggle={this.toggleGoalForm.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleGoalForm.bind(this)}>Nouveau goal</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="teamSelect">Equipe</Label>
                <Input type="select" name="select" id="teamSelect">
                  <option>{this.state.homeT}</option>
                  <option>{this.state.awayT}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="timeSelect">Temps</Label>
                <Input type="select" name="select" id="timeSelect">
                  {this.createTimeOptions()}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="playerName">Joueur</Label>
                <Input type="text" name="playerName" id="playerName" placeholder="facultatif" maxLength="15" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.postGoalData.bind(this)}>Ajouter</Button>
            <Button color="secondary" onClick={this.toggleGoalForm.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.errorModalOpen} toggle={this.toggleErrorModal.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleErrorModal.bind(this)}>Problème</ModalHeader>
          <ModalBody>
            Essayer de vous loguer à nouveau ou contacter l'administrateur de l'application.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.props.router.push('/login')}>Login</Button>
            <Button color="secondary" onClick={this.toggleErrorModal.bind(this)}>Annuler</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.unscubscribeModalOpen} toggle={this.toggleUnscubscribeModal.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleUnscubscribeModal.bind(this)}>Désinscription</ModalHeader>
          <ModalBody>
            Etes-vous sur de ne plus vouloir reporter ce match? <br/>Le match ne sera plus visible dans l'écran live public.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.unsubscribe.bind(this)}>Oui</Button>
            <Button color="secondary" onClick={this.toggleUnscubscribeModal.bind(this)}>Non</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.unscubscribeImpossibleModalOpen} toggle={this.toggleUnscubscribeImpossibleModal.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleUnscubscribeImpossibleModal.bind(this)}>Impossible</ModalHeader>
          <ModalBody>
            Désolé il n'est pas possible de se désinscrire d'un match qui a déjà commencé ou qui est terminé.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleUnscubscribeImpossibleModal.bind(this)}>Ok</Button>
          </ModalFooter>
        </Modal>
      </section>
    );
  }
}

export default MatchAdmin;