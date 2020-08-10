import React from "react";
import io from "socket.io-client";
import { connect } from 'react-redux';
// import { fade } from '@material-ui/core/styles';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import ImageIcon from '@material-ui/icons/Image';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles, fade } from "@material-ui/core/styles";
import { update } from '../../redux/chatFilter/actions';
import autoBind from 'react-autobind';


import './Chat.css';


let socket;
const ENDPOINT = `${process.env.REACT_APP_SERVER_URL}`;

const styles = ((theme) => ({
  rounded: {
    color: '#fff',
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
    autoBind(this);
    socket = io(ENDPOINT);

    socket.on('updatechat', (username, data) => {
      console.log(data, ' datanupdatechat');
      this.setState({ messages: [...this.state.messages, data] });
    });
    socket.on('username', (username, data) => {
      console.log(data, ' data');
      // this.setState({ messages: [...this.state.messages, data] });
    });
    socket.on('updateOnlineMembers', (numOfOnline) => {
      this.setState({ numOfOnline });
    });
    socket.on('getLast20Messages', (messages) => {
      this.setState({ messages });
    });
    socket.on('loadMoreMessages', (moreMessages) => {
      this.setState({
        messages: [moreMessages, this.state.messages],
      });
    })
  }
  componentWillUnmount() {
    socket.emit('disconnect');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('in did update');
    if (prevProps.user.email === "" && this.props.user.email !== "") {
      // call the server-side function 'join' and send one parameter (value of prompt)
      socket.emit('join', this.props.user.email);

    }
    if (prevProps.group === null && this.props.group !== null) {
      socket.emit('join', this.props.user.email);
      socket.emit('switchRoom', this.props.group.name, this.props.user.id);
      this.setState({
        messages: [],
      });
    }
    if ((prevProps.group !== null && prevProps.group._id !== this.props.group._id)) {
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
  onSearchChange(value) {
    // console.log('in search change value ', value.target.value, this);
    this.props.onUpdateFilter(value.target.value);
  }
  loadMore() {
    console.log(this.state.messages[0]);
    socket.emit('loadMore', this.state.messages[0])
  }
  render() {
    const { group } = this.props;
    const { messages, message, numOfOnline } = this.state;
    const { classes } = this.props;
    return (
      <div className="ChatContainer">
        {group !== null &&
          <ListItem className="ChatHeader">
            <IconButton onClick={this.return} edge="end" aria-label="return" id="return-chat">
              <ArrowBackIosIcon />
            </IconButton>
            <ListItemAvatar>
              <Avatar alt="group" src={`data:image/jpeg;base64,${group.img.image}`} className={classes.rounded}>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={group.name} secondary={group.members.length + " members, " + numOfOnline + " online"} />
            <ListItemSecondaryAction>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={this.onSearchChange}
                />
              </div>
            </ListItemSecondaryAction>
          </ListItem>}
        <Messages messages={messages} name={this.props.user.email} loadMore={this.loadMore}/>
        {group !== null && <Input message={message} setMessage={(e) => { this.setState({ message: e }) }} sendMessage={this.sendMessage} />
        }
      </div>
    );
  }
}


// export default Chat;
const mapStateToProps = (state) => ({
  chat: state.chat,
  user: state.user,
  filter: state.filter,
});

const mapDispatchToProps = {
  onUpdateFilter: update,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
// export default connect(mapStateToProps, {})(Chat);