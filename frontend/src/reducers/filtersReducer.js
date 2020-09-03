//doesnt need imports
//function of useReducer is to reducer amount of code/functions in the component
const defState = {  
    filterBy: ""
  } 
const filtersReducer = (state = defState, action) => {
    switch(action.type){
      case 'SET_FILTER':
      return {...state, filterBy: action.text}
      default:
      return state;
    }
}
  
export default filtersReducer;
