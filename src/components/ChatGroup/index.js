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
// import Button from '@material-ui/core/Button';
import autoBind from "react-autobind";
import Divider from '@material-ui/core/Divider';
import Chat from '../Chat/Chat';
// import Container from '@material-ui/core/Container';
import './style.css';
const classes = ((theme) => ({
    root: {
        height: '100%',
        width: '100%',
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
            selectedGroupIndex: -1,
            selectedGroupDetails: null,
        };
        console.log(this.props.userId, ' user');
        autoBind(this);
    }
    componentDidMount() {
        AjaxService.get(`/chatRoom/getUserRooms/${this.props.userId}`).then((res) => {
            // console.log(res.data, ' dsifhfesiffh');
            if (res.data.list.length > 0) {
                this.setState({
                    chatRoomsList: res.data.list,
                });
            }
        }).catch((err) => {
            console.log('chat rooms error', err);
        })
    }
    openChat(event, index) {
        // event.preventDefault();
        document.getElementById('ChatContainerDiv').style.display = 'flex';
        document.getElementById('GroupsContainer').style.display = 'none';
        this.setState({
            selectedGroupIndex: index,
            selectedGroupDetails: event,
        });
    }
    renderChatRooms() {
        const { classes } = this.props;
        const { selectedGroupIndex } = this.state;
        return (
            this.state.chatRoomsList.map((option, index) => {
                return (
                    <div key={index}>
                        <ListItem
                        button
                        onClick={this.openChat.bind(this, option, index)}
                        selected={selectedGroupIndex === index}
                        >
                            <ListItemAvatar>
                                <Avatar alt="group" src={`data:image/jpeg;base64,${option.img.image}`} className={classes.rounded}>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={option.name} secondary={option.members.length + " members"} />
                            <ListItemSecondaryAction>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>
                );
            })
        );
    }
    render() {
        const { classes } = this.props;
        const { selectedGroupDetails } = this.state;
        return (
            <div className="ChatGroupContainer">
                <div id="GroupsContainer" className="GroupsContainer" style={{display: "flex"}}>
                    <List className={classes.root}>
                        {this.renderChatRooms()}
                    </List>
                </div>
                <div id="ChatContainerDiv" className="ChatContainerDiv"  style={{display: "none"}}>
                    <Chat group={selectedGroupDetails} />
                </div>
            </div>
        );
    }
}

export default withStyles(classes)(ChatGroups);
