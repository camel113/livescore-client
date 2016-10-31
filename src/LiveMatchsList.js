import React, { Component } from 'react';
import LiveMatch from './LiveMatch';

class LiveMatchsList extends Component {
  render() {
    return (
      <div className="LiveMatch">
        {this.state.matchs.map((match) => <LiveMatch key={match._id} time={match.date} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name}/>)}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {matchs: [],loaded:false};
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData(){
    // this._executeQuery("http://127.0.0.1:8080/api/matchs");
    this._executeQuery("live-matchs.json");
  }

  _executeQuery(query) {
    this.setState({ loaded: false });
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
       this.setState({
        loaded: false,
        message: 'Something bad happened ' + error
     }));
  }

  _handleResponse(response) {
    var data = response
    console.log("console.log")
    console.log(data)
    // data.map((match) => <LiveMatch/>);
    this.setState({
      loaded: true,
      matchs: data
    });
  }


}

export default LiveMatchsList;