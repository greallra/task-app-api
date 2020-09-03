import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';

//if token exists, we are logged in
//On public route, if logged in redirect to private url (dashboard maybe)

export const PublicRoute = ({token, component: Component, ...restOfTheProps})=>{ //props of the store, Router provided props, and the component renamed
    
    return(
        <Route {...restOfTheProps}
        component={(props)=>( //props in the above component
            !token ? 
            <>
            <NavBar/>
            <Component {...props}/>
            </>
            :
            <>
            <Redirect to="/dashboard"/>
            </>
        )}
        />
    )
}

const mapStateToProps = (state)=>({
    token: state.auth.token
})

export default connect(mapStateToProps)(PublicRoute);