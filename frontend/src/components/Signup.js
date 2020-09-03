import React, { useState } from "react";
import UserForm from './UserForm';
import {isEmail, isLength} from 'validator';
import { connect } from 'react-redux';
import { startSignup } from '../actions/userActions';

//https://www.codementor.io/@blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
//https://blog.logrocket.com/building-reusable-ui-components-with-react-hooks/

const Signup = ({signup, status, page})=>{
    const [errorMsgs, setErrorMsgs] = useState('');
    const handleSignup = (data)=>{
        let errors =[]
        console.log("signup",data);
        const {name, email, password, age, avatar} = data;
        //do validation
        if(!isLength(name,{min: 3})){
            errors.push('need longer name');
        }
        if(!age || isNaN(age)){
            errors.push('age bad');
        }
        if(!isEmail(email)){
            errors.push('email bad');
        }
        if(!isLength(password,{min: 6})){
            errors.push('Password must be a minimum of 6 characters');
        }
        if(errors.length > 0) {
            console.log("errors",errors);
            return setErrorMsgs([...errors]);
        }
        else {
            setErrorMsgs([]);
             //goal is to send data to store
             signup(data);
        }
        /*need 
        1.name
        2.email
        3.password
        4.age (optional)
        4.avatar (optional)

        //flow
        send data to store/server

        directed to dashboard
        */

    }
    const mapErrors = ()=>(
        <div>
            {errorMsgs.map((err,i)=><div className="error" key={i}>{err}</div>)}
        </div>
    )

    return (
        <>
            <h2>Signup to Task App</h2>
            {errorMsgs.length > 0 ? mapErrors(): ''}     
            <UserForm passUpFormData={handleSignup} formType={"signup"}/>
            {status === "error" && <div className="error">Error with signup</div>}
          
        </>
    )
}
const mapDispatchToProps = (dispatch)=>{
    return {
        signup: (data)=>{
            return dispatch(startSignup(data))
        }
    }
}
const mapStateToProps = (state)=>{
    return {
        status: state.statuses.status,
        page: state.statuses.page
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);