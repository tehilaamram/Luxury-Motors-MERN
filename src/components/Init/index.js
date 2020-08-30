// import localStorage from "localforage";
import React from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';

import { CONNECTED_USER } from '../../helpers/consts';
import { updateFromLocalStorage } from '../../redux/user/actions';
import { reload } from '../../redux/Cart/actions';
class Init extends React.Component {
    constructor(props) {
        super(props);
        window.addEventListener('load', (e) => {
            this.updateStatesFromStorage();
        });
    }

    updateStatesFromStorage() {
        this.cookies = new Cookies();
        let oldVehicleCart = this.cookies.get('vehicles');
        if (oldVehicleCart !== undefined) {
            this.props.onReload(oldVehicleCart.length);
        }
        this.props.onUpdateFromLocalStorage(localStorage.getItem(CONNECTED_USER.ID), localStorage.getItem(CONNECTED_USER.ROLE), localStorage.getItem(CONNECTED_USER.EMAIL), localStorage.getItem(CONNECTED_USER.FULL_NAME));
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    cart: state.cart,
});

const mapDispatchToProps = {
    onUpdateFromLocalStorage: updateFromLocalStorage,
    onReload: reload,
};


export default connect(mapStateToProps, mapDispatchToProps)(Init);
