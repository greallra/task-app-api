import React from "react";
import {
    NavLink, Redirect
  } from "react-router-dom";
import { connect } from 'react-redux';
import { startLogout } from '../actions/userActions';

function NavBar({token, logout, history, status, page}) {

    const handleLogout = ()=>{
        logout()
        // window.location.href = "/"
    }
    
    if(token) {
        return( 
            <nav>
                <ul>
                    <li>
                    <NavLink to="/profile" >Profile</NavLink>
                    </li> 
                    <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    </li> 
                    <li>
                    <a onClick={handleLogout}>{status === 'loading' && page === 'logout'? 'Logging out...': 'Logout'}</a>
                    </li> 
                </ul>
            </nav>
        )
    }
    else {
        return( 
            <nav>
                <ul>
                    <li>
                    <NavLink to="/" exact={true}>Home</NavLink>
                    </li> 
                    <li>
                    <NavLink to="/info">Info</NavLink>
                    </li> 
                    <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                    </li> 
                    <li>
                    <NavLink to="/login">Login</NavLink>
                    </li> 
                  
                </ul>
            </nav>
        )
    } 
}

const mapStateToProps = (state)=>{
    return {
        token: state.auth.token,
        status: state.statuses.status,
        page: state.statuses.page,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        logout: ()=>(dispatch(startLogout()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);