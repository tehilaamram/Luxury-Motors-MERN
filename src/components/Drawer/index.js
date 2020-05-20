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
import { withStyles } from "@material-ui/core/styles";

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
      left: false,
    }
  }
  toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({left: open});
  };
  list(anchor) {
    const {classes } = this.props;
return (
  <div
    className={clsx(classes.list, {
      [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    })}
    role="presentation"
    onClick={this.toggleDrawer(anchor, false)}
    onKeyDown={this.toggleDrawer(anchor, false)}
  >
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
);
  } 
  render() {
    return (
      <div>
          <React.Fragment key={'left'}>
            <Button onClick={this.toggleDrawer('left', true)}>{'left'}</Button>
            <Drawer anchor={'left'} open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              {this.list('left')}
            </Drawer>
          </React.Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(CustomDrawer);