import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { isTokenExpired } from './utils/jwtHelper'
import moment from 'moment'
import classNames from 'classnames/bind';
import MatchInfoBox from './MatchInfoBox'
import Trash from 'react-icons/lib/fa/trash';
import ShareLive from './ShareLive';

class MatchAdmin extends Component {

	fetchData(){
    fetch("http://127.0.0.1:8085/api/matchs/"+this.props.params.matchId)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => console.log("error "+error));
  }

  constructor(props) {
    super(props);
    this.state = {matchId:"",homeT:"",awayT:"",homeS:0,awayS:0,date:"",time:"",goalFormOpen:false,live:false,errorModalOpen:false,goals:[],unscubscribeModalOpen:false,unscubscribeImpossibleModalOpen:false,removeGoalModalOpen:false};
  }

  componentDidMount() {
    this.fetchData()
  }

  _handleResponse(data){
  	console.log(data)
  	this.setState({homeT:data.homeTeam.name,homeS:data.homeTeam.score,awayT:data.awayTeam.name,awayS:data.awayTeam.score,time:data.date,goals:data.goals})
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

  toggleRemoveGoalModal(){
    this.setState({
      removeGoalModalOpen: !this.state.removeGoalModalOpen
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

  removeGoal(){
    fetch('http://127.0.0.1:8085/api/matchs/'+this.props.params.matchId, {
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+localStorage.getItem('idToken')
      },
      body: JSON.stringify({
        info: "ungoal"
      })
    })
    .then(response => response.json())
    .then(json => this._handleRemoveGoalResponse(json))
    .catch(error => this.toggleErrorModal());
  }

  _handleRemoveGoalResponse(json){
    if(json.updated == true){
      console.log(json)
      this.updateGoalsList(json.goals)
      this.updateScoreInfo(json.homeTeamScore,json.awayTeamScore)
      this.toggleRemoveGoalModal()
    }else{
      this.toggleErrorModal()
    }
  };

  _handleAddGoalResponse(json){
    if(json.updated == true){
      console.log(json)
      this.updateGoalsList(json.goals)
      this.updateScoreInfo(json.homeTeamScore,json.awayTeamScore)
      this.toggleGoalForm()
    }else{
      this.toggleErrorModal()
    }
  };

  updateGoalsList(goals){
    this.setState({goals: goals});
  }

  updateScoreInfo(home,away){
    this.setState({homeS: home,awayS: away});
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
    var matchInfoClass = classNames({
      'live': this.state.live,
      'not-live': !this.state.live,
      'match-general-info': true
    });
    var style = {
      trashContainer: {
        textAlign: "right"
      },
      actionsAreaStyle: {
        backgroundColor: "#EDF2F4",
        paddingTop: "10px",
        paddingBottom: "10px"
      }
    }
    var lastGoal = null
    return (
      <section>
        <MatchInfoBox time={this.state.time} homeT={this.state.homeT} awayT={this.state.awayT} homeS={this.state.homeS} awayS={this.state.awayS} />
        <ShareLive matchId={this.props.params.matchId}/>
        <Flexbox style={style.actionsAreaStyle} justifyContent="space-around">
          <Button color="primary" onClick={this.toggleGoalForm.bind(this)}>+ 1 Goal</Button>
          <Button color="danger" onClick={this.checkIfUnscubscribeIsPossible.bind(this)}>Se désinscrire</Button>
        </Flexbox>
        <Table className="match-goals">
          <tbody>
            {this.state.goals.map(function(goal,index){
              if(index == this.state.goals.length-1){
                lastGoal = goal
                return <tr key={goal._id}><td>{goal.time}</td><td>{goal.score}</td><td>{goal.scorer}</td><td style={style.trashContainer} onClick={this.toggleRemoveGoalModal.bind(this)}><Trash/></td></tr>
              }else{
                return <tr key={goal._id}><td>{goal.time}</td><td>{goal.score}</td><td>{goal.scorer}</td><td></td></tr>
              }
            },this)}
          </tbody>
        </Table>
        <Modal isOpen={this.state.goalFormOpen} toggle={this.toggleGoalForm.bind(this)} className={this.props.className}>
          <ModalHeader>Nouveau goal</ModalHeader>
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
            <Button color="danger" onClick={this.unsubscribe.bind(this)}>Oui</Button>
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
        <Modal isOpen={this.state.removeGoalModalOpen} toggle={this.toggleRemoveGoalModal.bind(this)} className={this.props.className}>
          <ModalHeader toggle={this.toggleRemoveGoalModal.bind(this)}>Effacer le dernier goal</ModalHeader>
          <ModalBody>
            Es-tu sûr de vouloir effacer le dernier goal inscrit?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.removeGoal.bind(this)}>Oui</Button>
            <Button color="secondary" onClick={this.toggleRemoveGoalModal.bind(this)}>Non</Button>
          </ModalFooter>
        </Modal>
      </section>
    );
  }
}

export default MatchAdmin;