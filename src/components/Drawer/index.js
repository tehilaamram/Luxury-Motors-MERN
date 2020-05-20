import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import { withStyles } from "@material-ui/core/styles";
import autoBind from 'react-autobind';
import { withRouter } from "react-router-dom";


const styles = ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.toggleDrawer,
    }
    autoBind(this);
  }
  navigateTo(key) {
    console.log(key, ' navigate to');
    // this.props.toggleDrawer()
    this.props.history.push(key);
  }
  list(anchor) {
    const { classes } = this.props;
    return (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={this.props.toggleDrawer}
        onKeyDown={this.props.toggleDrawer}
      >
        <List>
          <ListItem button onClick={this.navigateTo.bind(this, '/')} key={'Home'}>
            <ListItemIcon><HomeIcon /> </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, '/about')} key={'About'}>
            <ListItemIcon> <InfoIcon/></ListItemIcon>
            <ListItemText primary={'About'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, '/catalog')} key={'Catalog'}>
            <ListItemIcon><ListIcon/> </ListItemIcon>
            <ListItemText primary={'Catalog'} />
          </ListItem>
          <ListItem button key={'Cart'}>
            <ListItemIcon><ShoppingCartIcon /> </ListItemIcon>
            <ListItemText primary={'Cart'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={'Sign In'}>
            <ListItemIcon><ShoppingCartIcon /> </ListItemIcon>
            <ListItemText primary={'Sign In'} />
          </ListItem>
          <ListItem button key={'Sign Up'}>
            <ListItemIcon><ShoppingCartIcon /> </ListItemIcon>
            <ListItemText primary={'Sign Up'} />
          </ListItem>
          <ListItem button key={'Sign Out'}>
            <ListItemIcon><ExitToAppIcon /> </ListItemIcon>
            <ListItemText primary={'Sign Out'} />
          </ListItem>
        </List>
      </div>
    );
  }
  render() {
    return (
      <div>
        <React.Fragment key={'left'}>
          <Drawer anchor={'left'} open={this.props.isOpen} onClose={this.props.toggleDrawer}>
            {this.list('left')}
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(CustomDrawer));