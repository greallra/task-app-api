import React from 'react';
import AppRouter from './AppRouter';
import { connect } from 'react-redux';
import {checkLsForToken} from '../utils/localStorage';
import { startReadProfile } from '../actions/userActions';

const Auth = ({readProfile})=>{
    //will only run on refresh
    const tokenLS = checkLsForToken();
    console.log("CHECK LS FOR TOKEN", tokenLS);
    if(tokenLS) {
        console.log("LOCALSTORAGE TOKEN FOUND", tokenLS);
        //read profile using token, if valid set profile, set token and get tasks
        readProfile(tokenLS);
    } else{
        console.log("NOT AUTHORIZED");
    }
    
    //check store in routes
    //not signed in: no user in LS or Store
    //
    return(<AppRouter />)
}

const mapStateToProps = (state)=>({
    isAuthorized: state.auth.isAuthorized
})

const mapDispatchToProps = (dispatch)=>({
    readProfile: (token)=>(dispatch(startReadProfile(token)))
})


export default connect(mapStateToProps, mapDispatchToProps)(Auth)