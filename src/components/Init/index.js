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

    // hasLocalStorage() {
    //     return localStorage.length((err, numberOfKeys) => {
    //         if (err === null) {
    //             if (numberOfKeys > 0) {
    //                 return numberOfKeys;
    //             }
    //         }
    //         return 0;
    //     });
    // }

    updateStatesFromStorage() {
        // this.hasLocalStorage().then((localForageSize) => {
            // if (localForageSize < 3) {
            //     return;
            // }
            this.cookies = new Cookies();
            let oldVehicleCart = this.cookies.get('vehicles');
            if (oldVehicleCart !== undefined) {
                this.props.onReload(oldVehicleCart.length);
            }
            this.props.onUpdateFromLocalStorage(localStorage.getItem(CONNECTED_USER.ID), localStorage.getItem(CONNECTED_USER.ROLE), localStorage.getItem(CONNECTED_USER.EMAIL), localStorage.getItem(CONNECTED_USER.FULL_NAME));

            // localStorage.getItem(CONNECTED_USER.ROLE).then((currRole) => {
            //     localStorage.getItem(CONNECTED_USER.EMAIL).then((currEmail) => {
            //         localStorage.getItem(CONNECTED_USER.FULL_NAME).then((currFullName) => {
            //             localStorage.getItem(CONNECTED_USER.ID).then((currId) => {
            //             });
            //         });
            //     });
            // });
        // });
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
