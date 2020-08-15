import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isWorker } from '../../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isWorker() ?
                <Component {...props} />
            : <Redirect to="/404" />
        )} />
    );
};

export default PrivateRoute;