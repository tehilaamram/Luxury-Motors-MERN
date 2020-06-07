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
        }
        autoBind(this);
    }
    componentDidMount() {
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
    tabChanges(event, selectedTab) {
        event.preventDefault();
        this.setState({ selectedTab });
        console.log(selectedTab, ' event');

    }
    renderRequests() {
        return (
            <List className={classes.root}>

                {/* {this.state.roomsList.map((option, index) => {
                    return ( */}
                        <div key={2}>
                            <ListItem
                            >
                                <ListItemAvatar>
                                    <Avatar alt="group" className={classes.rounded}>
                                        TE
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'tehilaamr@gmail.com'} secondary={ 'Luxury Motors'} />
                                <ListItemSecondaryAction>
                                    <div className="RequestButtons">
                                    <MButton variant="outlined">Accept</MButton>
                                    <MButton variant="outlined">Reject</MButton>
                                    </div>
                                {/* <Button css={"PrimaryButton"} title={"Accept"} onClick={this.save} />
                                <Button css={"PrimaryButton"} title={"Reject"} onClick={this.save} /> */}
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </div>
                //     );
                // })}
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
        // console.log(this.state);
        let data = new FormData();
        data.append('file', this.state.roomImage[0], 'main');
        this.state.additionalImages.forEach(element => {
            data.append('file', element, element.name);
        });
        AjaxService.post('/chatRoom/addRoom', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res) => {
            //   this.props.history.push(`/vehicle/${res.data.id}`);
        }).catch((err) => {
            console.log(err, ' add chat room save error');
        });
    }
    renderNew() {
        return (
            <div className="NewRoomContainer">
                <TextInput id={"roomName"} text={"Name"} type={"text"} onChange={this.onRoomNameChange} value={this.state.roomName} />
                <ImageUpload onValueChanged={this.onRoomImageChange} buttonText={"Upload Room Image"} singleImage={true} />
                <Button css={"PrimaryButton"} title={"Save"} onClick={this.save} />
            </div>
        );
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
