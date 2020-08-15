import React from 'react';
import { fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import autoBind from 'react-autobind';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '../Drawer';
import { Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import logoLM from "../../images/luxury_motors.jpg";
// import '../../css/materialUI.css';
import './style.css';
const styles = ((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
const mobileMenuId = 'primary-search-account-menu-mobile';
class CustomAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      isMenuOpen: false,
      isMobileMenuOpen: false,
      drawer: false,
    }
    autoBind(this);
    this.cookies = new Cookies();
  }
  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget, isMenuOpen: true });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null, isMobileMenuOpen: false });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
      mobileMoreAnchorEl: null,
      isMobileMenuOpen: false,
      isMenuOpen: false,
    });
  };

  handleMobileMenuOpen = (event) => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget,
      isMobileMenuOpen: true
    });
  };
  navigateTo(key) {
    this.handleMobileMenuClose();
    this.props.history.push(key);
  }
  renderMobileMenu() {
    return (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.navigateTo.bind(this, '/cart')}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={this.props.cart} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Menu>
    );
  }
  toggleDrawer(event) {
    event.preventDefault();
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ drawer: !this.state.drawer });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Luxury Motors
          </Typography>
          <Avatar alt="Remy Sharp"  src={logoLM} className={classes.large} id="logoLM"/>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 17 new notifications" color="inherit" onClick={this.navigateTo.bind(this, '/cart')}>
                <Badge badgeContent={this.props.cart} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer isOpen={this.state.drawer} toggleDrawer={this.toggleDrawer} />
        {this.renderMobileMenu()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {})(withRouter(withStyles(styles)(CustomAppBar)));