import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AjaxService from '../../services/AjaxService';
import TextInput from '../../components/TextInput';
import ImageUpload from '../../components/ImageUpload';
import _ from 'lodash';
import './style.css';
import Button from '../../components/Button';
import FormData from 'form-data';
import MButton from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    // actions: {
    //     textTransform: 'none',
    //     color: '#616161',
    //     borderColor: '#BDBDBD',
    //     '&:hover': {
    //     },
    // },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

class ManageRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomsList: [],
            requestsList: [],
            user: null,
            selectedTab: 0,
            roomName: '',
            roomImage: '',
            expanded: [],
        }
        autoBind(this);
    }
    componentDidMount() {
        this.getAllRequests();
        const { match: { params } } = this.props;
        AjaxService.get(`/user/getUser/${params.id}`).then((res) => {
            this.setState({
                user: _.cloneDeep(res.data.user),
            });
        });
        AjaxService.get("/chatRoom/getAll").then((res) => {
            if (res.data.length > 0) {
                this.setState({
                    roomsList: res.data,
                });
            }
        }).catch((err) => {
            console.log('chat rooms error', err);
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedTab === 2 && prevState.selectedTab !== 2) {
            AjaxService.get("/chatRoom/getAll").then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        roomsList: res.data,
                    });
                }
            }).catch((err) => {
                console.log('chat rooms error', err);
            });
        }
        if (this.state.selectedTab === 0 && prevState.selectedTab !== 0) {
            this.getAllRequests();
        }
    }
    getAllRequests() {
        console.log('in all requests');
        AjaxService.get("/request/getAll").then((res) => {
            console.log('in req', res.data.requests);
            // if (res.data.requests.length > 0) {
                console.log(res.data, ' req get all')
                this.setState({
                    requestsList: res.data.requests,
                });
            // }
        }).catch((err) => {
            console.log('chat rooms error', err);
        });
    }
    tabChanges(event, selectedTab) {
        event.preventDefault();
        this.setState({ selectedTab });
        console.log(selectedTab, ' event');

    }
    handleExpandedChange = (panel) => (event, isExpanded) => {
        if (isExpanded) {
            this.setState({
                expanded: [...this.state.expanded, panel],
            });

        } else {
            this.setState({
                expanded: _.without(this.state.expanded, panel),
            });
        }
    }
    renderRequests() {
        const { expanded } = this.state;
        var groupedRequestList = _.groupBy(this.state.requestsList, 'room.name');
        groupedRequestList = _.toArray(groupedRequestList);
        return (
            <div>
                {groupedRequestList.map((option, index) => {
                    console.log(option, ' op');
                    return (
                        <ExpansionPanel
                            key={index}
                            expanded={expanded.indexOf(index) > -1 ? true : false} onChange={this.handleExpandedChange(index)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography id="THead" className={classes.heading}>{option[0].room.name}</Typography>
                                <Typography id="SHead" className={classes.secondaryHeading}>{option.length + ' requests'}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {this.getRoomRequestList(option)}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </div>
        );
    }
    rejectRequest(requestToReject) {
        AjaxService.post('/request/reject', {
            request: {
                _id: requestToReject._id,
                user: {
                    _id: requestToReject.user._id,
                },
                room: {
                    _id: requestToReject.room._id
                },
            }
            // request
        }).then((res) => {
            this.getAllRequests();
        });

    }
    acceptRequest(requestToAccept) {
        AjaxService.post('/request/accept', {
            request: {
                _id: requestToAccept._id,
                user: {
                    _id: requestToAccept.user._id,
                },
                room: {
                    _id: requestToAccept.room._id
                },
            }
            // request
        }).then((res) => {
            this.getAllRequests();
        });

    }
    getRoomRequestList(lst) {
        console.log(lst, ' lsfifdfiekgbeigbe');
        return (
            <List className={classes.root}>

                {lst.map((option, index) => {
                    return (
                        <div key={index}>
                            <ListItem
                            >
                                <ListItemAvatar>
                                    <Avatar alt="group" className={classes.rounded}>
                                        {option.user.username.substring(0, 2)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={option.user.username} secondary={new Date(option.date).toDateString() + ' ' + new Date(option.date).toLocaleTimeString()} />
                                <ListItemSecondaryAction>
                                    <div className="RequestButtons">
                                        <MButton variant="outlined" onClick={this.acceptRequest.bind(this, option)}>Accept</MButton>
                                        <MButton variant="outlined" onClick={this.rejectRequest.bind(this, option)}>Reject</MButton>
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
    onRoomNameChange(event) {
        this.setState({ roomName: event.target.value });
    }
    onRoomImageChange(event) {
        console.log(event);
        this.setState({ roomImage: _.cloneDeep(event) });
    }

    save() {
        let data = new FormData();
        data.append('file', this.state.roomImage[0], 'main');
        data.append('name', this.state.roomName);
        AjaxService.post('/chatRoom/addRoom', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res) => {
            this.setState({
                roomName: '',
                roomImage: '',
            })
        }).catch((err) => {
            console.log(err, ' add chat room save error');
        });
    }
    renderNew() {
        return (
            <div className="NewRoomContainer">
                <TextInput id={"roomName"} text={"Name"} type={"text"} onChange={this.onRoomNameChange} value={this.state.roomName} />
                <ImageUpload onValueChanged={this.onRoomImageChange} buttonText={"Upload Room Image"} singleImage={true} />
                <Button css={"PrimaryButton"} title={"Save"} onClick={this.save} width={"w100px"}/>
            </div>
        );
    }
    getRooms() {
        AjaxService.get("/chatRoom/getAll").then((res) => {
            if (res.data.length > 0) {
                this.setState({
                    roomsList: res.data,
                });
            }
        }).catch((err) => {
            console.log('chat rooms error', err);
        });
    }
    renderRooms() {
        return (
            <List className={classes.root}>

                {this.state.roomsList.map((option, index) => {
                    return (
                        <div key={index}>
                            <ListItem
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
                })}        </List>
        );
    }
    renderTab(index) {
        switch (index) {
            case 0:
                return this.renderRequests();
            case 1:
                return this.renderNew();
            case 2:
                return this.renderRooms();
            default:
                return;
        }
    }
    render() {
        const { selectedTab } = this.state;
        return (
            <div className={"ManageRoomsContainer"}>
                <Tabs
                    value={selectedTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.tabChanges}
                    aria-label="disabled tabs example"
                    variant="fullWidth"
                >
                    <Tab label="Requests" />
                    <Tab label="New" />
                    <Tab label="Rooms" />
                </Tabs>
                <div className="TabContentDiv">
                    {this.renderTab(selectedTab)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {})(withStyles(classes)(ManageRooms));
