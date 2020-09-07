import {setToken, setTokenValidity} from './authActions';
import { setFetchStatus } from "./statusActions";
import { startGetTasks, resetTasks } from './taskActions';
import { clearToken, setTokenLS } from '../utils/localStorage';
import { createFetchOptionsObject, createAuthHeader } from '../utils/fetchHelpers';
import axios from 'axios';

//LOGIN = SET PROFILE IN STORE
export const setUser = (user)=>(
    {
        type: 'SET_USER',
        user
    }
)
export const resetUser = ()=>({type: 'RESET_USER'})

export const startLogin = (loginDetails = {})=>{  
    return async (dispatch)=>{
        dispatch(setFetchStatus({page: "login", status: "loading"}))
        try {
            const data = {
                email : loginDetails.email,
                password: loginDetails.password
            }
            const res = await fetch(`${process.env.API_URL}/users/login`, createFetchOptionsObject('POST', 'cors', 'application/json', data))
            const resJSON = await res.json();
            if(resJSON.error) {
                console.log(resJSON.error)
                dispatch(setFetchStatus({page: "login", status: "error"}))
                return 
            }
            //success 1. set success message 2. set user in store 3. set token in store 4. set token in local storage 5.start get tasks action
            dispatch(setFetchStatus({page: "login", status: "success"}))
            dispatch(setUser(resJSON.user));
            dispatch(setToken(resJSON.token));
            setTokenLS(resJSON.token)
            dispatch(setFetchStatus({page: "dashboard", status: "loading"}))
            dispatch(startGetTasks());

        }catch(e) {
            console.log(e)
            dispatch(setMessage("catch error"))
        }
    } 
}
//LOGOUT
export const logout = ()=>{
    return {
        type: 'LOGOUT'
    }
}

export const startLogout = ()=>{
    return async (dispatch, getState)=>{
        const token =  getState().auth.token;
        try {
            dispatch(setFetchStatus({page: 'logout', status: 'loading'}))
            await axios.post(`${process.env.API_URL}/users/logout`, null, {headers: { Authorization: `Bearer ${token}` }})
            dispatch(setToken(""))
            dispatch(setFetchStatus({page: 'logout', status: 'success'}))
            dispatch(resetUser())
            dispatch(resetTasks())
            clearToken();
            // setTimeout(()=>{
            //     window.location.href = "/"
            // }, 3000)     

        }catch(e) {
            console.log(e)
            dispatch(setFetchStatus({page: 'logout', status: 'error'}))
        }
    }
}

//SIGNUP
export const signup = (user)=>(
    {
        type: 'SIGNUP',
        user
    }
)

export const startSignup = (data)=>{
    return async (dispatch)=>{
        try {
            dispatch(setFetchStatus({page: 'signup', status: 'loading'}))
           const res = await fetch(`${process.env.API_URL}/users`, createFetchOptionsObject('POST', 'cors', 'application/json', data))
           const resJSON = await res.json()
           if(resJSON.error) {
                dispatch(setFetchStatus({page: 'signup', status: 'error'}))
                return;
            }
            //success
            dispatch(signup(resJSON.user));
            dispatch(setToken(resJSON.token));
             //save also to localstorage
            setTokenLS(resJSON.token);
            dispatch(setFetchStatus({page: 'signup', status: 'success'}))         
        } catch (e) {
            console.log("signup err", e);  
            dispatch(setFetchStatus({page: 'signup', status: 'error'})) 
        }
    }
}
//DELETE USER
export const startDeleteUser = ()=>{
    return (dispatch, getState)=>{
        const token = getState().auth.token
        fetch(`${process.env.API_URL}/users/me`,{
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        })
        .then((r)=>(r.json()))
        .then((r)=>{
            if(r.success) {
                dispatch(setFetchStatus({page: 'profile-delete', status: 'success'}))
            }
            if(r.error) {
                dispatch(setFetchStatus({page: 'profile-delete', status: 'error'}))
            }
            // dispatch(updateUserStatus('deleted_user'));
        })
        .catch((e)=>(console.log(e)))
    }
}
//READ PROFILE: If we have a token in local storage, use it to get user details and set in store
export const startReadProfile = (token)=>{
    return async (dispatch, getState)=>{
        try {
            let res = await axios.get(`${process.env.API_URL}/users/me`,{headers: { Authorization: `Bearer ${token}` }})
            dispatch(setUser(res.data));
            dispatch(setToken(token));
            dispatch(startGetTasks());
        }catch(e) {
            console.log("errr startReadProfile",e)

        }   
    }
}

//UPDATE PROFILE/USER
export const editProfile = (data)=>({
   type: 'UPDATE_USER',
   data
})

export const startEditProfile = (data)=>{
    return (dispatch, getState)=>{
        dispatch(setFetchStatus({page: 'profile-edit', status: 'loading'}))
        const token = getState().auth.token;
        return fetch(`${process.env.API_URL}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then((r)=> r.json())
        .then((r)=> {
            if(r.error === 'Invalid updates') {
                dispatch(setFetchStatus({page: 'profile-edit', status: 'error'}))
            }
           else {
            dispatch(setFetchStatus({page: 'profile-edit', status: 'success'}))
            dispatch(editProfile(data))
           }
        })
        .catch((e)=>{
            dispatch(setFetchStatus({page: 'profile-edit', status: 'error'}))
            console.log(e);
        })
    }
}
//AVATAR ACTIONS
export const startDeleteAvatar = ()=>{
    return async (dispatch, getState) =>{
        dispatch(setFetchStatus({page: 'avatar-delete', status: 'loading'}))
        const token = getState().auth.token;
        try {
            await axios.delete(`${process.env.API_URL}/users/me/avatars`, {headers: {Authorization: `Bearer ${token}`}})
            dispatch(setFetchStatus({page: 'avatar-delete', status: 'success'}))
        } catch (e) {
            dispatch(setFetchStatus({page: 'avatar-delete', status: 'error'}))
        }
    }
}

export const startEditAvatar = (formData)=>{
    return async (dispatch, getState)=>{
        const token = getState().auth.token;
        console.log(formData);
        try {  
            await fetch(`${process.env.API_URL}/users/me/avatars`,{
                method: 'POST',
                mode: 'cors',
                headers: {
                //dont need a Content-Type as server will use multer to act on the form data
                'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            dispatch(setFetchStatus({page: 'avatar-edit', status: 'success'}))
        } catch (e) {
            dispatch(setFetchStatus({page: 'avatar-edit', status: 'error'}))
        }
    }
}