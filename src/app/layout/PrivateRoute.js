import React from 'react';
import {useSelector} from "react-redux";
import {Route} from 'react-router-dom'
import UnauthModal from "../../feature/auth/UnauthModal";

function PrivateRoute({component: Component, preLocation, ...rest}) {
    const {authenticated} = useSelector(state => state.auth)

    return (
        <Route {...rest} render={(props) => {
            if (authenticated) {
                return <Component {...props} />
            } else {
                return <UnauthModal{...props} />
            }
        }}/>
    );
}

export default PrivateRoute;