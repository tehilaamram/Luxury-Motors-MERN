import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin } from '../../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAdmin() ?
                <Component {...props} />
            : <Redirect to="/404" />
        )} />
    );
};

export default PrivateRoute;