import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';

//if token exists, we are logged in
//On private route, if logged in

export const PrivateRoute = ({token, component: Component, ...restOfTheProps})=>{ //props of the store, Router provided props, and the component renamed
    
    return(
        <Route {...restOfTheProps}
        component={(props)=>( //props in the above component
            token ? 
            <>
            <NavBar />
            <Component {...props}/>
            </>
            :
            <>
            <NavBar />
            <Redirect to="/"/>
            </>
        )}
        />
    )
}

const mapStateToProps = (state)=>({
    token: state.auth.token
})

export default connect(mapStateToProps)(PrivateRoute);