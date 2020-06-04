import React from "react";
import io from "socket.io-client";
import { connect } from 'react-redux';

import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Chat.css';

let socket;
const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}`;

const classes = ((theme) => ({
  rounded: {
    color: '#fff',
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10,
  },
}));
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      numOfOnline: 1,
    }
    socket = io(ENDPOINT);

    socket.on('updatechat', (username, data) => {
      this.setState({ messages: [...this.state.messages, data] });
    });
    socket.on('updateOnlineMembers', (numOfOnline) => {
      this.setState({ numOfOnline });
    });
    socket.on('getLast20Messages', (messages) => {
      this.setState({ messages });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.email === "" && this.props.user.email !== "") {
      // call the server-side function 'join' and send one parameter (value of prompt)
      socket.emit('join', this.props.user.email);

    }
    if (prevProps.group === null && this.props.group !== null || prevProps.group !== null && prevProps.group._id !== this.props.group._id) {
      socket.emit('switchRoom', this.props.group.name, this.props.user.id);
      this.setState({
        messages: [],
      });
    }
  }

  sendMessage = (event) => {
    event.preventDefault();
    if (this.state.message) {
      socket.emit('sendchat', this.state.message, this.props.user.id, this.props.group._id, () => {
        this.setState({
          message: '',
        });
      });
    }
  }
  return(event) {
    event.preventDefault();
    document.getElementById('ChatContainerDiv').style.display = 'none';
    document.getElementById('GroupsContainer').style.display = 'flex';
  }
  render() {
    const { group } = this.props;
    const { messages, message, numOfOnline } = this.state;
    return (
      <div className="ChatContainer">
        {group !== null && <ListItem className="ChatHeader">
          <IconButton onClick={this.return} edge="end" aria-label="return">
            <ArrowBackIosIcon />
          </IconButton>
          <ListItemAvatar>
            <Avatar alt="group" src={`data:image/jpeg;base64,${group.img.image}`} className={classes.rounded}>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={group.name} secondary={group.members.length + " members, " + numOfOnline + " online"} />
        </ListItem>}
        <Messages messages={messages} name={this.props.user.email} />
        <Input message={message} setMessage={(e) => { this.setState({ message: e }) }} sendMessage={this.sendMessage} />
      </div>
    );
  }
}


// export default Chat;
const mapStateToProps = (state) => ({
  chat: state.chat,
  user: state.user,
});

export default connect(mapStateToProps, {})(Chat);