import {checkForUser} from '../utils/localStorage';
import Login from '../components/Login';

const defState = {
  age:0,
  _id:"",
  name:"",
  email:"",
  createdAt:"",
  updatedAt:""
}


const userReducer = (state = defState, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...state, ...action.user}
        case 'RESET_USER':
            return defState
        case 'UPDATE_USER':
            return {...state, ...action.data}
        case 'LOGIN':
          return {...state, ...action.user}
        case 'LOGOUT':
          return state
        case 'SIGNUP':
          return {...state, ...action.user}
        default:
          return state
    }
}
  
export default userReducer;
