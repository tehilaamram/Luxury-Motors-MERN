import React from 'react';

import './Message.css';
import i from './try.svg';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, time }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  console.log(user, ' trimmed ', trimmedName);
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
        <div className="avatarMessageMe">
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pr-10 justifyEnd">{new Date(time).toDateString()} {new Date(time).toLocaleTimeString()}</p>
          </div>
          <div>
          <img src={i} alt="Avatar" className="avatar"/>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
          <div>
            <img src={i} alt="Avatar" className="avatar"/>
            </div>
          <div className="avatarMessageOther">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pr-10 justifyStart">{new Date(time).toDateString()} {new Date(time).toLocaleTimeString()}</p>
            </div>
            
          </div>
        )
  );
}

export default Message;