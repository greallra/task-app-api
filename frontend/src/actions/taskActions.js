import axios from 'axios';
import { createAuthHeader } from '../utils/fetchHelpers';
import { setFetchStatus } from './statusActions';

//GET MULIPLE TASKS
export const getTasks = (tasks)=>({
        type: 'GET_TASKS',
        tasks
})

export const startGetTasks = ()=>{
    //all i need is auth token in header
    return async (dispatch, getState)=>{
        const token =  getState().auth.token;
        console.log("TASKS TOKEN", token);
        try {
            let res = await axios.get(`${process.env.API_URL}/tasks/`, createAuthHeader(token))
            dispatch(getTasks(res.data))
            dispatch(setFetchStatus({page: "dashboard", status: ""}))
        }catch(e) {
            console.log("errr",e)
            dispatch(setFetchStatus({page: "dashboard", status: "error"}))
        }    
    }
}

// EDIT TASK
export const editTask = (task, taskId)=>(
    {
        type: 'EDIT_TASK',
        task,
        taskId
    }
)
export const startEditTask = (task, taskId)=>{
    return (dispatch, getState)=>{
        dispatch(setFetchStatus({page: "task-form", status: "loading"}))
        const token =  getState().auth.token;
        fetch(`${process.env.API_URL}/tasks/` + taskId,{
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(task) // body data type must match "Content-Type" header
          })
        .then((res)=>{
            dispatch(editTask(task, taskId))
            dispatch(setFetchStatus({page: "", status: ""}))
        })
        .catch((e)=>{
            console.log(e);
            dispatch(setFetchStatus({page: "", status: ""}))
        })
      
    }
}
//CREATE TASK
export const createTask = (newTask)=>(
    {
        type: 'CREATE_TASK',
        newTask
    }
)
export const startCreateTask = (newTask)=>{
    return async (dispatch, getState)=>{
        dispatch(setFetchStatus({page: "task-form", status: "loading"}))
        const token =  getState().auth.token;
        try {
            let res = await axios.post(`${process.env.API_URL}/tasks/`, {...newTask}, {headers: { Authorization: `Bearer ${token}` }})
            dispatch(createTask(res.data));
            dispatch(setFetchStatus({page: "", status: ""}))
        } catch (e) {
            console.log(e);
            dispatch(setFetchStatus({page: "", status: ""}))
        }
    }
}
//DELETE TASK
export const deleteTask = (id)=>(
    {
        type: 'DELETE_TASK',
        id
    }
)

export const startDeleteTask = (id) =>{
    return async (dispatch, getState)=>{
        dispatch(setFetchStatus({page: "task-form", status: "loading"}))
        const token =  getState().auth.token;
        try {
            await axios.delete(`${process.env.API_URL}/tasks/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            dispatch(deleteTask(id))
            dispatch(setFetchStatus({page: "", status: ""}))
        } catch (e) {
            console.log(e);
            dispatch(setFetchStatus({page: "", status: ""}))
        }
    }
}