
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROLE } from '../../helpers/consts';
// import { isLogin } from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { user } = rest;
    console.log(rest, ' this');
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            user.role !==  ROLE.GUEST ?
            // true ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, {})(PrivateRoute);

// export default PrivateRoute;