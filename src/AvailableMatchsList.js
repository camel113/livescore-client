import React, { Component } from 'react';
import AvailableMatchsSection from './AvailableMatchsSection';
import Flexbox from 'flexbox-react';

class AvailableMatchsList extends Component {

	fetchData(){
    this._executeQuery("http://api.footstats.ch/api/availablematchs")
  }

  constructor(props) {
    super(props);
    this.state = {matchs: [],loaded:false,message:""};
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

  componentDidMount() {
    this.fetchData()
    setInterval(this.fetchData.bind(this), 600000);
  }

  _handleResponse(response) {
    var data = response
    this.setState({
      loaded: true,
      matchs: data
    });
  }

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
          <section id="available">
            {this.state.matchs.map((league) => <AvailableMatchsSection key={league.region+league.league} region={league.region} league={league.league} matchs={league.matchs}/>)}
          </section>
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
}

export default AvailableMatchsList;