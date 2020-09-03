import React, { useState } from 'react';
import { connect } from 'react-redux';
import TaskForm from './TaskForm';
import {isEmpty} from 'validator';
import { startEditTask, startDeleteTask } from '../actions/taskActions';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { MdKeyboardArrowLeft } from "react-icons/md";

//load in task edit form
//will have task to inject
//form is dumb so will work with create task

const TaskEdit = ({task, startEditTask, history, startDeleteTask, page, status})=>{
    const [errorMsgs, setErrorMsgs] = useState([])
    const [redirect, setRedirect] = useState(false)
  
    const handleSubmit = (description, completed)=>{
        let errors = [];

        if(isEmpty(description)) {
            errors.push('description cannot be empty')
        }
        if(errors.length > 0) {
            return  setErrorMsgs([...errors]);
        }
        else {
            setErrorMsgs([]);
             //goal is to send data to store
             console.log("TASK EDIT", task);
             startEditTask({description, completed},task._id);
             setRedirect(true)
        }
    }

    const mapErrors = ()=>(
        <div>
            {errorMsgs.map((err,i)=><div className="error" key={i}>{err}</div>)}
        </div>
    )

    const handleDelete = (id)=>{
        startDeleteTask(id);
    }

    if(!task){
        return <div>No task</div>
    }
    if(redirect){
        return <Redirect to="/dashboard"/>
    }

    return (
        <>
        <h2>Task Edit</h2>
        {errorMsgs.length > 0 ? mapErrors() : ''}
        <TaskForm task={task} passUpSubmit={handleSubmit} passUpDelete={handleDelete}/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <button onClick={history.goBack} className="go-back"> <MdKeyboardArrowLeft style={{fontSize: '20px'}}/> <span>Go Back</span></button>
        </div>
        

        {page === 'task-form' && status === 'loading' ? <div style={{margin: 'auto', width: '100px'}}>
            <Loader
            type="Rings"
            color="#00BFFF"
            height={100}
            width={100}
            />
        </div>:''}
        </>
    )
}

const mapStateToProps = (state, ownProps)=>{
    return {
        task: state.tasks.find(task=>task._id === ownProps.match.params.id),
        page: state.statuses.page,
        status: state.statuses.status
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        startEditTask: (task, taskId)=>(dispatch(startEditTask(task, taskId))),
        startDeleteTask: (id)=>(dispatch(startDeleteTask(id)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit)