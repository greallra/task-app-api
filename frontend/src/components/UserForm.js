import React, { useState } from "react";


const UserForm = ({page, status, passUpFormData, formType})=>{
    const [name, setName] = useState('jon');
    const [email, setEmail] = useState('sarah@gmail.com')
    const [password, setPassword] = useState('red1234');
    const [age, setAge] = useState('22');

    const handleSubmit = (e)=>{
        e.preventDefault();
        passUpFormData({name,email,password,age});
    }
    console.log("test", formType);

    return (
        <>
        <form onSubmit={handleSubmit} className="user-form">
            {formType === 'signup'? <input type="text" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>:""}
            {formType === 'signup'? <input type="text" placeholder="age" value={age} onChange={(e)=>{setAge(e.target.value)}}/>:""}
            <input type="email" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">
                {formType === 'login' && status === 'loading'? 'Logging in...' : ''}
                {formType === 'login' && status !== 'loading'? 'Login' : ''}

                {formType === 'signup' && status !== 'loading' ? 'Sign Up' : ''}
            </button>
        </form> 
        </>
    ) 
}

export default UserForm;