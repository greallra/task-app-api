import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { startLogin } from '../actions/userActions';
import {isEmail,isLength} from 'validator';
import  { Redirect } from 'react-router-dom'
import UserForm from './UserForm';

const Login = ({startLogin, status, page})=>{
    const [errorMsgs, setErrorMsgs] = useState([]);
    const handleLogin = (data)=>{
        const {email, password} = data;
        let errors = []
        //do validation
        if(!isEmail(email)){
            errors.push('email bad');
        }
        if(!isLength(password,{min: 6})){
            errors.push('Password must be a minimum of 6 characters');
        }
        if(errors.length > 0) {
            return  setErrorMsgs([...errors]);
        }
        else {
            setErrorMsgs([]);
             //goal is to send data to store
             startLogin(data);
        }
    }

    const mapErrors = ()=>(
        <div>
            {errorMsgs.map((err,i)=><div className="error" key={i}>{err}</div>)}
        </div>
    )

    return (
        <>
            <h2>Login to Task App</h2>
            <UserForm passUpFormData={handleLogin} page={page} status={status} />
            {/* Form validation errors */}
            {errorMsgs.length > 0 ? mapErrors(): ''}
            {/* Fetch Error */}
            {page === 'login' && status === 'error' ? <div className={status}>Error</div>: ''}
        </>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return {
        startLogin: (loginDetails)=> dispatch(startLogin(loginDetails)),
        startGetTasks: ()=>(dispatch(startGetTasks()))
    }
}

const mapStateToProps = (state)=>{
    return {
        page: state.statuses.page,
        status: state.statuses.status
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
