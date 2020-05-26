import React from "react";
import io from "socket.io-client";
// import moment from 'moment';
import { connect } from 'react-redux';

// import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;
const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}`;

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
    const {name, room} = this.state;
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
    socket.on('message', message => {
      this.setState({messages: [...this.state.messages, message]})
      // setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      this.setState(users);
      // console.log(users, ' users')
      // setUsers(users);
    });
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
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState, ' prev', this.state);
  //   socket.on('message', message => {
  //     this.setState({messages: [...this.state.messages, message]})
  //     // setMessages(messages => [ ...messages, message ]);
  //   });
    
  //   socket.on("roomData", ({ users }) => {
  //     this.setState(users);
  //     // console.log(users, ' users')
  //     // setUsers(users);
  //   });
  // }
   sendMessage = (event) => {
    console.log('in dend message')
        event.preventDefault();
    
        if(this.state.message) {
          socket.emit('sendMessage',this.state.message, () => {this.setState({message: ''})});
        }
      }
  render() {
    const {room, messages, name, message} = this.state;
    return (
     /** {       <div className="outerContainer">}**/
        <div className="ChatContainer">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={(e) => {this.setState({message: e})}} sendMessage={this.sendMessage} />
        </div>
       /**  { <TextContainer users={users}/> </div>}*/
       
    );
  }
}
// const Chat = ({ location }) => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [users, setUsers] = useState('');
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}`;
//   useEffect(() => {
//     console.log('in io endpoint');
//     const { name, room } = queryString.parse(location.search);

//     socket = io(ENDPOINT);

//     setRoom(room);
//     setName(name)

//     socket.emit('join', { name, room }, (error) => {
//       console.log('in emit');
//       if(error) {
//         alert(error);
//       }
//     });
//   // }, [ENDPOINT, location.search]);
// }, [ENDPOINT, location.search]);

//     // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     console.log('in data');
//     socket.on('message', message => {
//       console.log('message');
//       setMessages(messages => [ ...messages, message ]);
//     });
    
//     socket.on("roomData", ({ users }) => {
//       console.log(users, ' users')
//       setUsers(users);
//     });
// }, []);

//   const sendMessage = (event) => {
// console.log('in dend message')
//     event.preventDefault();

//     if(message) {
//       socket.emit('sendMessage',message, () => setMessage(''));
//     }
//   }

//   return (
//     <div className="outerContainer">
//       <div className="container">
//           <InfoBar room={room} />
//           <Messages messages={messages} name={name} />
//           <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
//       </div>
//       <TextContainer users={users}/>
//     </div>
//   );
// }

// export default Chat;
const mapStateToProps = (state) => ({
  chat: state.chat,
});

// const mapDispatchToProps = {
//   // onUpdateFromLocalStorage: updateFromLocalStorage,
// };

export default connect(mapStateToProps, {})(Chat);