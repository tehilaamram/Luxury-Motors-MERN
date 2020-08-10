import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AjaxService from '../../services/AjaxService';
// import _ from "lodash";
import Button from '@material-ui/core/Button';
import autoBind from "react-autobind";
import Divider from '@material-ui/core/Divider';
import './style.css';
const classes = ((theme) => ({
  root: {
    width: 700,
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderStyle: 'outset',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 6,
  },
  rounded: {
    color: '#fff',
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10,
  },
  actions: {
    textTransform: 'none',
    color: '#616161',
    borderColor: '#BDBDBD',
    '&:hover': {
    },
  }
}));

class ChatGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRoomsList: [],
    };
    autoBind(this);
  }
  componentDidMount() {
    AjaxService.get("/chatRoom/getAll").then((res) => {
      this.setState({
        chatRoomsList: res.data,
      });
    }).catch((err) => {
      console.log('chat rooms error', err);
    });
  }
  renderChatRooms() {
    const { classes } = this.props;
    return (
      this.state.chatRoomsList.map((option, index) => {
        return (
          <div key={index}>
            {index !== 0 && <Divider />}
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="group" src={`data:image/jpeg;base64,${option.img.image}`} className={classes.rounded}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={option.name} secondary={option.numMembers + " members"} />
              <ListItemSecondaryAction>
                <Button variant="outlined" color="primary" className={classes.actions}>
                  Join
      </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </div>
        );
      })
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <List className={classes.root}>
        {this.renderChatRooms()}
      </List>
    );
  }
}

export default withStyles(classes)(ChatGroups);
