import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '../../store';
import Init from '../../components/Init';

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
import LoginModal from "../../components/SignInModal";
// import AddUserModal from "../../components/AddUserModal";
// import CartModal from "../../components/CartModal";
// import WishListModal from "../../components/WishListModal";
// import OrdersModal from "../../components/OrdersModal";

import Footer from '../../components/Footer';


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                <Init/>
                    <SignUpModal />
                     <Header />
                    <LoginModal/>
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
            </Provider>
        );
    }
}

export default App;
