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
import _ from 'lodash';
import './style.css';
import { findRenderedComponentWithType } from 'react-dom/test-utils';

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
    renderNew() {
        return (
            <div className="NewRoomContainer">
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
