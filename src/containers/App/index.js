import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from '../../store';
import Init from '../../components/Init';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

import Home from '../Home';
import About from '../About';
import Catalog from '../Catalog';
import AddVehicle from '../AddVehicle';
import VehicleDetails from '../VehicleDetails';
import ResetPassword from '../ResetPassword';
import Cart from '../Cart';
import CharRooms from '../ChatRooms';
import ManageRooms from '../ManageRooms';
import SignUpModal from "../../components/SignUpModal";
import LoginModal from "../../components/SignInModal";
import ResetPasswordModal from '../../components/ResetPasswordModal';
import Chat from '../../components/Chat/Chat';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import AppBar from '../../components/AppBar';
import PrivateRoute from './privateRoute';
import ManageUsers from '../ManageUsers';
import './style.css';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatOpened: false,
        }
        autoBind(this);
    }
    renderChat() {
        this.setState({
            chatOpened: !this.state.chatOpened,
        });
        console.log('render chat')
    }
    render() {
        console.log(store.getState(), ' store');
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="box">
                        {/* <div className="AppContainer"> */}
                        <Init />
                        {/* <div className={"ChatButtonDiv"}>
                {this.state.chatOpened && <Chat />}
                        <Button css={"ChatButton"} onClick={this.renderChat} />
                    </div> */}
                        <SignUpModal />
                        <div className="row header">
                            <AppBar />
                        </div>
                        <LoginModal />
                        <ResetPasswordModal />
                        <div className="row content">
                            <Switch>
                                <Route path="/chat" component={Chat} />
                                <Route exact path='/' component={Home} />
                                <Route path='/about' component={About} />
                                <Route path='/catalog' component={Catalog} />
                                <Route path='/add-vehicle' component={AddVehicle} />
                                <Route path='/vehicle/:id' component={VehicleDetails} />
                                <Route path='/reset/:token' component={ResetPassword} />
                                <Route path='/cart' component={Cart} />
                                <Route path='/manage-users' component={ManageUsers} />
                                <Route path="/chat-rooms/:uid" component={CharRooms} />
                                <Route path="/manage-rooms/:id" component={ManageRooms} />
                                <Route component={Home} />
                            </Switch>
                        </div>
                        <div className="row footer">

                            <Footer />
                        </div>
                    </div>
                    {/* </div> */}
                </BrowserRouter>
            </Provider>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
});

// export default connect(mapStateToProps, {})(App);


export default App;
