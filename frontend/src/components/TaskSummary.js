import React from "react";
import { connect } from 'react-redux';

const TaskSummary = ({tasksAmount})=>{
    return (
    <div><h1>Total Tasks: {tasksAmount}</h1></div>
    )
}

const mapStateToProps = (state)=>{
    return {
        tasksAmount: state.tasks.length
    }
}

export default connect(mapStateToProps)(TaskSummary);