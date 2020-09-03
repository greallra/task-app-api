
const defState = {
  token: ""
}


const authReducer = (state = defState, action) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return {...state, token: action.token};
        default:
          return state;
    }
}
  
export default authReducer;
