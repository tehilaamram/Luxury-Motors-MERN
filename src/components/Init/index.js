import localStorage from "localforage";
import React from 'react';
import { connect } from 'react-redux';

import { CONNECTED_USER } from '../../helpers/consts';
import { updateFromLocalStorage } from '../../redux/user/actions';

class Init extends React.Component {
    constructor(props) {
        super(props);
        window.addEventListener('load', (e) => {
            this.updateStatesFromStorage();
          });
    }

    hasLocalStorage() {
        return localStorage.length((err, numberOfKeys) => {
            if (err === null) {
                if (numberOfKeys > 0) {
                    return numberOfKeys;
                }
            }
            return 0;
        });
    }

    updateStatesFromStorage() {
        this.hasLocalStorage().then((localForageSize) => {
            if (localForageSize < 3) {
                return;
            }
            localStorage.getItem(CONNECTED_USER.ROLE).then((currRole) => {
              localStorage.getItem(CONNECTED_USER.EMAIL).then((currEmail) => {
               localStorage.getItem(CONNECTED_USER.FULL_NAME).then((currFullName) => {
                localStorage.getItem(CONNECTED_USER.ID).then((currId) => {
                    this.props.onUpdateFromLocalStorage(currId, currRole, currEmail, currFullName);
                });
               });
              });
            });
        });
    }

   render() {
       return null;
   }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = {
    onUpdateFromLocalStorage: updateFromLocalStorage,
};


export default connect(mapStateToProps, mapDispatchToProps)(Init);
