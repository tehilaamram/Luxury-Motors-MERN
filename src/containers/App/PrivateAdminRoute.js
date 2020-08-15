import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin } from '../../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAdmin() ?
                <Component {...props} />
            : <Redirect to="/404" />
        )} />
    );
};

export default PrivateRoute;