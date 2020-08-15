import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUser } from '../../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isUser() ?
                <Component {...props} />
            : <Redirect to="/404" />
        )} />
    );
};

export default PrivateRoute;