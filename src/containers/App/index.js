import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import store from '../../store';
import Init from '../../components/Init';

import Home from '../Home';
import About from '../About';
import Catalog from '../Catalog';
import AddVehicle from '../AddVehicle';
import VehicleDetails from '../VehicleDetails';
import Header from '../../components/Header';
import SignUpModal from "../../components/SignUpModal";
import LoginModal from "../../components/SignInModal";

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
                        <Route path='/add-vehicle' component={AddVehicle} />
                        <Route path='/vehicle/:id' component={VehicleDetails}/>
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
