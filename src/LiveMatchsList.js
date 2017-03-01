import React, { Component } from 'react';
import LiveMatchsSection from './LiveMatchsSection';
import Flexbox from 'flexbox-react';
import './LiveMatchsList.css';

class LiveMatchsList extends Component {

  render() {

    if(this.state.loaded == false){
      return(
        <Flexbox flexDirection="column" alignItems="center" marginTop="40px" minWidth="50px">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </Flexbox>
      )
    }else{
      if (this.state.matchs.length > 0) {
        return (
          <div className="list">
            {this.state.matchs.map((league) => <LiveMatchsSection key={league.region+league.league} region={league.region} league={league.league} matchs={league.matchs}/>)}
          </div>
        );
      }else{
        return (
          <Flexbox flexDirection="column" alignItems="center" marginTop="20px" minWidth="50px">
            <p>Aucun match de prévu pour le moment...</p>
          </Flexbox>
        )
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {matchs: [],loaded:false,message:""};
  }

  componentDidMount() {
    this.fetchData()
    this.timer = setInterval(this.fetchData.bind(this), 60000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  fetchData(){
    this._executeQuery("http://api.footstats.ch/api/livematchs")
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
      })
    );
  }

  _handleResponse(response) {
    var data = response
    this.setState({
      loaded: true,
      matchs: data
    });
  }


}

export default LiveMatchsList;