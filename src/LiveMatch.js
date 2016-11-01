import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Divider from 'material-ui/Divider';
import moment from 'moment'

class LiveMatch extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.time)
    console.log(moment().locale())
    console.log(moment(this.props.time).format("LT"))
  }

  render() {
    return (
      <div className="match">
        <Divider/>
        <Flexbox flexDirection="row">
          <Flexbox flexDirection="column">
            <Flexbox className="time">{moment(this.props.time).format("HH:mm")}</Flexbox>
            <Flexbox></Flexbox>
          </Flexbox>
          <Flexbox flexGrow={1} flexDirection="column" className="teams">
            <Flexbox>{this.props.homeTeam}</Flexbox>
            <Flexbox>{this.props.awayTeam}</Flexbox>
          </Flexbox>
          <Flexbox flexDirection="column">
            <Flexbox>0</Flexbox>
            <Flexbox>1</Flexbox>
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

export default LiveMatch;