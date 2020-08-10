import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import AjaxService from '../../services/AjaxService';
import _ from 'lodash';
import './style.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Stepper from '../../components/Stepper';
import ChatGroups from '../../components/ChatGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MButton from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";

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
class ChatRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            selectedTab: 0,
            roomsToRequest: [],
        }
        autoBind(this);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        AjaxService.get(`/user/getUser/${params.uid}`).then((res) => {
            this.setState({
                user: _.cloneDeep(res.data.user),
            });
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedTab === 1 && prevState.selectedTab !== 1) {
            this.getRoomsToJoin()
            // AjaxService.get('/chatRoom/getRoomsToJoin').then((res) => {
            //     console.log(res.data, ' get rooms to join list');
            //     if (res.data.list.length > 0) {
            //         this.setState({
            //             roomsToRequest: res.data.list,
            //         });
            //     }
            // }).catch((err) => {
            //     console.log('chat rooms error', err);
            // });
        }
    }
    renderStepper() {
        return (
            <div className="StepperContainerDiv">
                <Stepper steps={['Upload photo', 'Personal details', 'Select groups']} />
            </div>
        );
    }
    renderChat() {
        const { match: { params } } = this.props;
        return (
            <ChatGroups userId={params.uid}/>

        );
    }
    getRoomsToJoin() {
        // console.log(event, ' room to join');
        // const { match: { params } } = this.props;
        AjaxService.get('/chatRoom/getRoomsToJoin').then((res) => {
            console.log(res.data, ' get rooms to join list');
            if (res.data.list.length > 0) {
                this.setState({
                    roomsToRequest: res.data.list,
                });
            }
        }).catch((err) => {
            console.log('chat rooms error', err);
        });
    }
    sendRequest(room) {
        if (room.requests.length > 0) {
            AjaxService.post('/request/remove', {
                room: room._id,
                reqToRoomId: room.requests[0]._id,
            }).then((res) => {
                this.getRoomsToJoin();
                // this.props.history.push(`/vehicle/${res.data.id}`);
              }).catch((err) => {
                console.log(err, ' add vehicle save error');
              });
        } else {
            AjaxService.post('/request/new', {
                room: room._id,
            }).then((res) => {
                this.getRoomsToJoin();
                // this.props.history.push(`/vehicle/${res.data.id}`);
              }).catch((err) => {
                console.log(err, ' add vehicle save error');
              });
        }
        
    }
    renderRooms() {
        console.log('in render rooms', this.state.roomsToRequest);
        return (
            <List className={classes.root}>
                {this.state.roomsToRequest.map((option, index) => {
                    return (
                        <div key={index}>
                            <ListItem
                            >
                                <ListItemAvatar>
                                <Avatar alt="group" src={`data:image/jpeg;base64,${option.img.image}`} className={classes.rounded}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={option.name} secondary={option.members.length + ' members'} />
                                <ListItemSecondaryAction>
                                    <div className="RequestButtons">
                    <MButton variant="outlined" onClick={this.sendRequest.bind(this, option)}>{option.requests.length > 0 ? 'Delete' : 'Join'}</MButton>
                                    </div>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </div>
                    );
                })}
            </List>
        );

    }
    renderTab() {
        // event.preventDefault();
        // console.log(event, ' in render index', e);
        switch (this.state.selectedTab) {
            case 0:
                return this.renderChat();
            case 1:
                console.log('11111111111111111');
                // this.getRoomsToJoin();
                return this.renderRooms();
            default:
                return;
        }
    }
    tabChanges(event, selectedTab) {
        event.preventDefault();
        this.setState({ selectedTab });
        console.log(selectedTab, ' event');

    }
    render() {
        const { selectedTab } = this.state;
        return (
            <div className={"ChatRoomsContainer"}>
                <Tabs
                    value={selectedTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.tabChanges}
                    aria-label="disabled tabs example"
                    variant="fullWidth"
                >
                    <Tab label="Chat Rooms" />
                    <Tab label="Join" />
                </Tabs>
                <div className="TabContentDiv">
                    {this.renderTab()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {})(withStyles(classes)(ChatRooms));
