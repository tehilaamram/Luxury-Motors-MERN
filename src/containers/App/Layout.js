import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import IdleTimer from 'react-idle-timer';
// import PropTypes from 'prop-types';
import AddVehicle from '../AddVehicle';
import CharRooms from '../ChatRooms';
import ManageRooms from '../ManageRooms';
import ManageUsers from '../ManageUsers';
import Buy from '../Buy';
// import Chat from '../../components/Chat/Chat';
import { connect } from 'react-redux';
import Error404 from '../Error404';
import { ROLE } from '../../helpers/consts';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'

class Layout extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            timeout:1000 * 60 * 15,
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false
        }

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    _onAction(e) {
      console.log('user did something', e)
      this.setState({isTimedOut: false})
    }
   
    _onActive(e) {
      console.log('user is active', e)
      this.setState({isTimedOut: false})
    }
   
    _onIdle(e) {
      console.log('user is idle', e)
      const isTimedOut = this.state.isTimedOut
      if (isTimedOut) {
          this.props.history.push('/')
      } else {
        this.setState({showModal: true})
        this.idleTimer.reset();
        this.setState({isTimedOut: true})
      }
      
    }

    handleClose() {
      this.setState({showModal: false})
    }

    handleLogout() {
      this.setState({showModal: false})
      this.props.history.push('/')
    }

    render(){
      const { match, user } = this.props;
      return(
        <>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            onAction={this.onAction}
            debounce={250}
            timeout={this.state.timeout} />

            <div className="">
                <Switch>
                    {(user.role !== ROLE.GUEST) && <Route 
                        exact path={`${match.path}chat-rooms/:uid`}
                        render={(props) => <CharRooms {...props} /> }
                    />}
                    {(user.role !== ROLE.GUEST) && <Route 
                        exact path={`${match.path}buy`}
                        render={(props) => <Buy {...props} /> }
                    />}
                    {(user.role === ROLE.ADMIN || user.role === ROLE.WORKER) && <Route 
                        exact path={`${match.path}add-vehicle`}
                        render={(props) => <AddVehicle {...props} /> }
                    />}
                    {(user.role === ROLE.ADMIN) && <Route 
                        exact path={`${match.path}manage-rooms/:id`}
                        render={(props) => <ManageRooms {...props} /> }
                    />}
                    {(user.role === ROLE.ADMIN) && <Route 
                        exact path={`${match.path}manage-users`}
                        render={(props) => <ManageUsers {...props} /> }
                    />}
                    <Route path='/404' component={Error404} />
                    <Redirect from='*' to='/404' />
                </Switch>
            </div>
        </>
      )
   }

 }

 const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {})(Layout);
