import React from "react";
import Tasks from './Tasks';
import TaskSummary from './TaskSummary';
import TaskFilters from './TaskFilters';
import Mod2 from './Mod2';


function Dashboard() {
    return( 
    <>
        {/* New Signup Welcome Message */}
        <Mod2 />
        <TaskSummary />
        <TaskFilters />
        <Tasks />
    </>)
   
}



export default Dashboard;