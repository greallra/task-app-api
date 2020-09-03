import React, { useState} from 'react';
import TaskForm from './TaskForm';
import {isEmpty} from 'validator';
import { startCreateTask } from '../actions/taskActions';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

const TaskCreate = ({startCreateTask, page, status})=>{
    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = (description, completed)=>{

        if(isEmpty(description)) {
            return setError('description cannot be empty')
        }
        setError('');
        if(!error) {
            //goal is to send data to store
            startCreateTask({description, completed});
            setRedirect(true)
        }
    }

    if(redirect){
        return <Redirect to="/dashboard"/>
    }
    return (
        <>
        <h2>TaskCreate</h2>
        {error && <div className="error">{error}</div>}
        <TaskForm passUpSubmit={handleSubmit}/>
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
        page: state.statuses.page,
        status: state.statuses.status
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        startCreateTask: (task)=>(dispatch(startCreateTask(task)))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(TaskCreate)