import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import store from '../../store';
import Init from '../../components/Init';
import autoBind from 'react-autobind';
// import { connect } from 'react-redux';
import Home from '../Home';
import About from '../About';
import Catalog from '../Catalog';
import VehicleDetails from '../VehicleDetails';
import ResetPassword from '../ResetPassword';
import Cart from '../Cart';
import Error404 from '../Error404';
import AddVehicle from '../AddVehicle';
import OrdersHistory from '../OrdersHistory';
import Buy from '../Buy';
import ManageRooms from '../ManageRooms';
import AllOrders from '../AllOrders';

import SignUpModal from "../../components/SignUpModal";
import LoginModal from "../../components/SignInModal";
import ResetPasswordModal from '../../components/ResetPasswordModal';
import Footer from '../../components/Footer';
// import Button from '../../components/Button';
import AppBar from '../../components/AppBar';
import PrivateRoute from './PrivateRoute';
import PrivateWorkerRoute from './PrivateWorkerRoute';
import PrivateAdminRoute from './PrivateAdminRoute';
// import PrivateRoute from './privateRoute';
import ManageUsers from '../ManageUsers';
import ManageOrders from '../ManageOrders';
import './style.css';
import ChatRooms from '../ChatRooms';
import { isWorker } from '../../utils';

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
            <Init />
                <BrowserRouter>
                    <div className="box">
                        <SignUpModal />
                        <div className="row header">
                            <AppBar />
                        </div>
                        <LoginModal />
                        <ResetPasswordModal />
                        <div className="row content">
                            <Switch>
                                 <Route exact path='/' component={Home} /> 
                                 <Route path='/catalog' component={Catalog} />
                                 <Route path='/reset/:token' component={ResetPassword} />
                                 <Route path='/about' component={About} />
                                <Route path="/cart" component={Cart} />
                                <Route path='/vehicle/:id' component={VehicleDetails} />
                                <PrivateRoute component={ChatRooms} path="/chat-rooms/:uid" exact />
                                <PrivateRoute component={OrdersHistory} path="/orders-history" exact />
                                <PrivateRoute component={Buy} path="/buy" exact />
                                <PrivateWorkerRoute component={AddVehicle} path="/add-vehicle" exact />
                                <PrivateWorkerRoute component={AllOrders} path="/all-orders" exact />
                                <PrivateAdminRoute component={ManageUsers} path="/manage-users" exact />
                                <PrivateAdminRoute component={ManageRooms} path="/manage-rooms/:id" exact />
                                <PrivateAdminRoute component={ManageOrders} path="/manage-orders" exact />
                                <Route path='/404' component={Error404} />
                                <Redirect from='*' to='/404' />
                              {/* 
                                                                <Route path='/' render={(props) => <Layout {...props} /> } />
                             <Route path='/reset/:token' component={ResetPassword} />
                            <Route path='/manage-users' component={ManageUsers} />
                            <Route path="/chat-rooms/:uid" component={CharRooms} />

                                <Route path="/manage-rooms/:id" component={ManageRooms} />
                                <Route path="/buy" component={Buy}/>
                                <Route component={Home} />


                            */}  
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
// const mapStateToProps = (state) => ({
//     user: state.user,
// });

// export default connect(mapStateToProps, {})(App);

// App.propTypes = {
//     match: PropTypes.any.isRequired,
//     history: PropTypes.func.isRequired
// }

export default App;
