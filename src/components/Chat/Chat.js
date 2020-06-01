import React from "react";
import io from "socket.io-client";
// import moment from 'moment';
import { connect } from 'react-redux';

// import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import './Chat.css';

let socket;
const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}`;

const classes = ((theme) => ({
  // root: {
  //     height: '100%',
  //     width: '100%',
  //     margin: 'auto',
  //     backgroundColor: theme.palette.background.paper,
  //     borderStyle: 'outset',
  //     borderWidth: 1,
  //     borderColor: 'rgba(0, 0, 0, 0.12)',
  //     borderRadius: 6,
  // },
  rounded: {
    color: '#fff',
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10,
  },
  // actions: {
  //     textTransform: 'none',
  //     color: '#616161',
  //     borderColor: '#BDBDBD',
  //     '&:hover': {
  //     },
  // }
}));
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'tehila' + Date.now().toString(),
      room: '2',
      users: '',
      message: '',
      messages: [],
    }
    socket = io(ENDPOINT);
    // setRoom(room);
    // setName(name)
    // if (this.props.group !== null) {
      // const { email } = this.props.user;
      // const { _id } = this.props.group;
  // const { email, _id } = this.state;
  // socket.emit('join', { name: email, room: _id }, (error) => {
  //   if (error) {
  //     alert(error);
  //   }
  // });
  socket.on('message', message => {
    this.setState({ messages: [...this.state.messages, message] })
    // setMessages(messages => [ ...messages, message ]);
  });

  socket.on("roomData", ({ users }) => {
    this.setState(users);
    // console.log(users, ' users')
    // setUsers(users);
  });
    // }
  
  }
  // componentDidMount() {
  //   socket = io(ENDPOINT);
  //   // setRoom(room);
  //   // setName(name)
  //   const {name, room} = this.state;
  //   socket.emit('join', { name, room }, (error) => {
  //     if(error) {
  //       alert(error);
  //     }
  //   });
  // // }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.group !== null && prevProps.group._id !== this.props.group._id) {
      console.log(this.props.group, ' user from chat');
      // const { user, group } = this.props;
      const { email } = this.props.user;
      const { _id } = this.props.group;
      // socket.on('disconnect', (error) => {
      //   if (error) {
      //     alert(error);
      //   }
      // });
      socket.emit('join', { name: email, room: _id }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }
    // socket.on('message', message => {
    //   this.setState({messages: [...this.state.messages, message]})
    //   // setMessages(messages => [ ...messages, message ]);
    // });
  // }

  //   socket.on("roomData", ({ users }) => {
  //     this.setState(users);
  //     // console.log(users, ' users')
  //     // setUsers(users);
  //   });
  // }
  sendMessage = (event) => {
    console.log('in dend message')
    event.preventDefault();

    if (this.state.message) {
      socket.emit('sendMessage', this.state.message, () => { this.setState({ message: '' }) });
    }
  }
  render() {
    const { group } = this.props;
    console.log(group, ' group');
    const { room, messages, name, message } = this.state;
    return (
      /** {       <div className="outerContainer">}**/
      <div className="ChatContainer">
        {group !== null && <ListItem className="ChatHeader">
          <ListItemAvatar>
            <Avatar alt="group" src={`data:image/jpeg;base64,${group.img.image}`} className={classes.rounded}>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={group.name} secondary={group.numMembers + " members"} />
        </ListItem>}
        <Messages messages={messages} name={this.props.user.email} />
        <Input message={message} setMessage={(e) => { this.setState({ message: e }) }} sendMessage={this.sendMessage} />
      </div>
      /**  { <TextContainer users={users}/> </div>}*/

    );
  }
}


// export default Chat;
const mapStateToProps = (state) => ({
  chat: state.chat,
  user: state.user,
});

// const mapDispatchToProps = {
//   // onUpdateFromLocalStorage: updateFromLocalStorage,
// };

export default connect(mapStateToProps, {})(Chat);