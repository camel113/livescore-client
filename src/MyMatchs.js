import React, { Component } from 'react';
import MyMatch from './MyMatch';

class MyMatchs extends Component {

	fetchData(){
    this._executeQuery("http://127.0.0.1:8085/api/mymatchs")
  }

  constructor(props) {
    super(props);
    this.state = {matchs: [],loaded:false,message:""};
  }

  _executeQuery(query) {
    this.setState({ loaded: false });
    fetch(query, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+localStorage.getItem('idToken')
      }
    })
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
       this.setState({
        loaded: false,
        message: 'Something bad happened ' + error
      })
    );
  }

  componentDidMount() {
    this.fetchData()
  }

  _handleResponse(response) {
    var data = response
    this.setState({
      loaded: true,
      matchs: data
    });
  }

  render() {
    return (
      <section>
        <div>
      		{this.state.matchs.map((match) => <MyMatch key={match._id} matchId={match._id} time={match.date} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name} homeTeamScore={match.homeTeam.score} awayTeamScore={match.awayTeam.score}/>)}
    		</div>
      </section>
    );
  }
}

export default MyMatchs;