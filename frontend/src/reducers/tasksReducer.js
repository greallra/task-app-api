//doesnt need imports
//function of useReducer is to reducer amount of code/functions in the component

  const tasksReducer = (state = [], action) => {
      switch(action.type) {
          case 'CREATE_TASK':
            return [...state, action.newTask]
          case 'GET_TASKS':
            return [...action.tasks]
          case 'LOGOUT':
            return []
          case 'DELETE_TASK':
            return state.filter(task=>task._id !== action.id)
          case 'EDIT_TASK':
            const mp = state.map((task)=>{
              if(task._id === action.taskId) {
                return {
                  ...task,
                  ...action.task
                };
              }else {
                return task;
              }     
            })
            console.log("mp", mp);
            return mp;
          default:
            return state
      }
  }
    
  export default tasksReducer;