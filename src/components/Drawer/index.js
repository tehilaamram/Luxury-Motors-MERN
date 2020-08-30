import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from "@material-ui/core/styles";
import autoBind from 'react-autobind';
import { withRouter } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import AjaxService from '../../services/AjaxService';
import { ROLE } from '../../helpers/consts';
import { signOut } from '../../redux/user/actions';

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
  openSignInModal() {
    if (document.getElementById('signInModal').style.display === 'flex') {
      document.getElementById('signInModal').style.display = 'none';
    } else {
      document.getElementById('signInModal').style.display = 'flex';
    }
  }
  openSignUpModal() {
    if (document.getElementById('signUpModal').style.display === 'flex') {
      document.getElementById('signUpModal').style.display = 'none';
    } else {
      document.getElementById('signUpModal').style.display = 'flex';
    }
  }
  signOut() {
    AjaxService.get('/signOut', { data: { user: this.props.user.email } }).then((res) => {
      this.props.onSignOut();
      this.props.history.push('/');
    }).catch((err) => {
    })
  }
  navigateTo(key) {
    this.props.history.push(key);
  }
  list(anchor) {
    const { classes, user } = this.props;
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
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, '/about')} key={'About'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'About'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, '/catalog')} key={'Catalog'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Catalog'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, '/cart')} key={'Cart'}>
            <ListItemIcon>
              <Badge badgeContent={this.props.cart} color="secondary">
              </Badge></ListItemIcon>
            <ListItemText primary={'Cart'} />
          </ListItem>
        </List>
        <Divider />
        {(user.role === ROLE.ADMIN || user.role === ROLE.USER || user.role === ROLE.WORKER) && <List>
          <ListItem button onClick={this.navigateTo.bind(this, '/orders-history')} key={'OrdersHistory'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Orders'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, `/chat-rooms/${user.id}`)} key={'Chat Rooms'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Chat Rooms'} />
          </ListItem>
        </List>}
        {(user.role === ROLE.ADMIN || user.role === ROLE.USER || user.role === ROLE.WORKER) && <Divider />}
        {(user.role === ROLE.ADMIN || user.role === ROLE.WORKER) && <List>
          <ListItem button onClick={this.navigateTo.bind(this, '/add-vehicle')} key={'Add Vehicle'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Add Vehicle'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, '/all-orders')} key={'Manage Rooms'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'All Orders'} />
          </ListItem>
        </List>}
        {(user.role === ROLE.WORKER || user.role === ROLE.ADMIN) && <Divider />}
        {user.role === ROLE.ADMIN && <List>
          <ListItem button onClick={this.navigateTo.bind(this, '/manage-users')} key={'Manage Users'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Manage Users'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, '/manage-orders')} key={'Manage Orders'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Manage Orders'} />
          </ListItem>
          <ListItem button onClick={this.navigateTo.bind(this, `/manage-rooms/${user.id}`)} key={'Manage Rooms'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Manage Rooms'} />
          </ListItem>

        </List>}
        {user.role === ROLE.ADMIN && <Divider />}
        {(user.role !== ROLE.ADMIN && user.role !== ROLE.WORKER && user.role !== ROLE.USER) && <List>
          <ListItem button onClick={this.openSignInModal} key={'Sign In'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Sign In'} />
          </ListItem>
          <ListItem button onClick={this.openSignUpModal} key={'Sign Up'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Sign Up'} />
          </ListItem>
        </List>}
        {(user.role === ROLE.USER || user.role === ROLE.WORKER || user.role === ROLE.ADMIN) && <List>
          <ListItem button onClick={this.signOut} key={'Sign Out'}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={'Sign Out'} />
          </ListItem>
        </List>}
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

const mapStateToProps = (state) => ({
  cart: state.cart,
  user: state.user,
});

const mapDispatchToProps = {
  onSignOut: signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(CustomDrawer)));
