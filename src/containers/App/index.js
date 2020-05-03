import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import About from '../About';
import Catalog from '../Catalog';
import Empty from '../Empty';
// import VehicleCatalog from '../VehicleCatalog';
import AddCar from '../AddCar';
import AddOrder from '../AddOrder';
import UpdateOrders from '../UpdateOrders';
import Header from '../../components/Header';
import SignUpModal from "../../components/SignUpModal";
import LoginModal from "../../components/LoginModal";
import AddUserModal from "../../components/AddUserModal";
import CartModal from "../../components/CartModal";
import WishListModal from "../../components/WishListModal";
import OrdersModal from "../../components/OrdersModal";
import * as localForage from 'localforage';
import history from '../../history';
import Footer from '../../components/Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
        this.loginPressed = this.loginPressed.bind(this);
        this.sighOut = this.sighOut.bind(this);
        window.onclick = function (event) {
            if (event.target !== document.getElementById("loginRegisterModalContent") && event.target !== document.getElementById('userAvatar')) {
                // document.getElementById('loginRegisterModal').style.display = 'none';
            }
        }
    }
    loginPressed(userDetails) {
        this.setState({ user: userDetails });
        localForage.setItem('user', userDetails);

    }
    sighOut() {
        this.setState({ user: [] })
        localForage.setItem('user', []);

    }
    render() {
        return (
            <BrowserRouter history={history}>
                <Header sighOut={this.sighOut} user={this.state.user} />
                <SignUpModal />
                <AddUserModal />
                {this.state.user.length !== 0 && <CartModal />}
                {this.state.user.length !== 0 && <WishListModal />}
                {this.state.user.length !== 0 && <WishListModal />}
                {this.state.user.length !== 0 && <OrdersModal />}
                <LoginModal loginPressed={this.loginPressed} />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/about' component={About} />
                    <Route path='/catalog' component={Catalog} />
                    <Route path='/add-car' component={AddCar} />
                    <Route path='/update-order' component={UpdateOrders} />
                    <Route path='/add-order' component={AddOrder} />
                    <Route path='/empty' component={Empty} />
                    {/**<Route path='/vehicle-catalog' component={VehicleCatalog} />*/}
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;
