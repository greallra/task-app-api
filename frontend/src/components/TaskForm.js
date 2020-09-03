import React, { useState, useEffect } from 'react';

const TaskForm =  ({task, passUpSubmit, passUpDelete})=>{
    const [description, setDescription] = useState('');
    const [checkedOption, setCheckedOption] = useState('');
    
    const handleCheck = (e)=>{
        setCheckedOption(e.target.value)
    }
    const handleDescription = (e)=>{
        setDescription(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const isDone = checkedOption === 'done';
        passUpSubmit(description, isDone)
    }
    useEffect(()=>{
        try {
            setDescription(task.description);
            task.completed ? setCheckedOption('done'):setCheckedOption('not-done')
            
        } catch (error) {
            console.log("caught",error);
        }
    },[task])

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="description-input-cont">
                <input type="text" value={description} onChange={handleDescription}/>
            </div>
            <div className="radios-cont">
                <div className="radio-cont">
                    <label htmlFor="done">Done</label>
                    <input type="radio" value="done" checked={checkedOption === 'done'}  onChange={handleCheck}/>
                </div>
                <div className="radio-cont">
                    <label htmlFor="not-done">Not done</label>
                    <input type="radio" checked={checkedOption === 'not-done'} value="not-done" onChange={handleCheck}/>
                </div>
            </div>
            {task? <div className="btns-cont">
                <button>Edit task</button>
                <button onClick={()=>{passUpDelete(task._id)}}>Delete Task</button>
            </div>:<button>Create task</button>}
        </form>
    )
}

export default TaskForm;