
const defState = {
    page: 'login',
    status: ""
  }
  
  
  const statusesReducer = (state = defState, action) => {
      switch(action.type) {
          case 'SET_FETCH_STATUS':
              return {...state, ...action.statuses};
          default:
            return state;
      }
  }
  export default statusesReducer;
  