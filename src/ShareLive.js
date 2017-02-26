import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import {ShareButtons,ShareCounts,generateShareIcon} from 'react-share';
const {FacebookShareButton,TwitterShareButton} = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

class ShareLive extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    var style = {
      socialContainer: {
        backgroundColor: "#EF233C",
        padding: "5px 0",
        color: "#fff"
      },
      facebookIcon: {
        marginRight: "7px"
      },
      twitterIcon: {
        marginLeft: "7px"
      }
    }

    return (
      <div style={style.socialContainer}>
        <Flexbox flexDirection="row" justifyContent="center">
          Partagez ce live avec vos amis!
        </Flexbox>
        <Flexbox flexDirection="row" justifyContent="center">
          <FacebookShareButton style={style.facebookIcon} url={"http://live.footstats.ch/live/"+this.props.matchId} title={"Live "+ this.props.homeT +" - "+ this.props.awayT}>
            <FacebookIcon size={38} round />
          </FacebookShareButton>
          <TwitterShareButton style={style.twitterIcon} url={"http://live.footstats.ch/live/"+this.props.matchId} title={"Live "+ this.props.homeT +" - "+ this.props.awayT}>
            <TwitterIcon size={38} round />
          </TwitterShareButton>
        </Flexbox>
      </div>
    );
  }
}
export default ShareLive;