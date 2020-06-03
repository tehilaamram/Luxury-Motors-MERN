import React from 'react';

import './Message.css';
import i from './try.svg';
import ReactEmoji from 'react-emoji';
import Avatar from '@material-ui/core/Avatar';

const Message = ({ message: { message, sender, date }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = sender.username.trim().toLowerCase();
  // console.log(user, ' trimmed ', trimmedName);
  if(name === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
        <div className="avatarMessageMe">
          <div className="messageBox backgroundBlue">
      <div className="messageText colorWhite sender">{sender.username}</div>
            <div className="messageText colorWhite">{ReactEmoji.emojify(message)}</div>
          </div>
          <div className="sentText pr-10 justifyEnd">{new Date(date).toDateString()} {new Date(date).toLocaleTimeString()}</div>
          </div>
          <div>
          <Avatar>{sender.username.substring(0,2).toLocaleUpperCase()}</Avatar>
          {/* <img src={i} alt="Avatar" className="avatar"/> */}
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
          <div>
        <Avatar>{sender.username.substring(0,2).toLocaleUpperCase()}</Avatar>
            {/* <img src={i} alt="Avatar" className="avatar"/> */}
            </div>
          <div className="avatarMessageOther">
            <div className="messageBox backgroundLight">
            <div className="messageText colorDark sender">{sender.username}</div>
              <div className="messageText colorDark">{ReactEmoji.emojify(message)}</div>
            </div>
            <div className="sentText pr-10 justifyStart">{new Date(date).toDateString()} {new Date(date).toLocaleTimeString()}</div>
            </div>
            
          </div>
        )
  );
}

export default Message;