import React from 'react';
import Linkify from 'react-linkify';

import './Message.css';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
var Highlight = require('react-highlighter');

class Message extends React.Component {
  render() {
    const { message: { message, sender, date }, name } = this.props;
    let isSentByCurrentUser = false;
    const trimmedName = sender.username.trim().toLowerCase();
    if (name === trimmedName) {
      isSentByCurrentUser = true;
    }

    return (
      isSentByCurrentUser
        ? (
          <div className="messageContainer justifyEnd">
            <div className="avatarMessageMe">
              <div className="messageBox backgroundBlue">
                <div className="message-header message-header-blue">
                  <div className="messageText colorWhite sender">{sender.username}</div>
                  <div className="messageText colorWhite role"> {sender.role}</div>
                </div>
                <div className="messageText colorWhite">
                  <Linkify><Highlight search={this.props.filter.strSearch}>{message}</Highlight></Linkify>
                </div>
              </div>
              <div className="sentText pr-10 justifyEnd">{new Date(date).toDateString()} {new Date(date).toLocaleTimeString()}</div>
            </div>
            <div>
              <Avatar>{sender.username.substring(0, 2).toLocaleUpperCase()}</Avatar>
            </div>
          </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div>
              <Avatar>{sender.username.substring(0, 2).toLocaleUpperCase()}</Avatar>
            </div>
            <div className="avatarMessageOther">
              <div className="messageBox backgroundLight">
                <div className="message-header message-header-light">
                  <div className="messageText colorDark sender">{sender.username}</div>
                  <div className="messageText colorWhite role"> {sender.role}</div>
                </div>
                <div className="messageText colorDark">
                  <Linkify><Highlight search={this.props.filter.strSearch}>{message}</Highlight></Linkify>
                </div>
              </div>
              <div className="sentText pr-10 justifyStart">{new Date(date).toDateString()} {new Date(date).toLocaleTimeString()}</div>
            </div>

          </div>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter,
});

export default connect(mapStateToProps, {})(Message);
