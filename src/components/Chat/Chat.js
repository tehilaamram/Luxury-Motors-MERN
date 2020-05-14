import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
// import moment from 'moment';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
  const ENDPOINT = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  // }, [ENDPOINT, location.search]);
}, [ENDPOINT, location.search]);

  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {

    event.preventDefault();

    if(message) {
      // message.time = moment().format('h:mm a');
      // message.time = Date.now();
      // console.log(message, 'm');
      // socket.emit('sendMessage', message, () => setMessage(''));
      socket.emit('sendMessage',message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
