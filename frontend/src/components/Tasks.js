import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { TiTick, TiTimesOutline } from "react-icons/ti";
import moment from 'moment';
import { Link } from 'react-router-dom';
import filteredTasks from '../selectors/filteredTasks';
import Loader from 'react-loader-spinner';

 
const Tasks = ({filteredTasks, page, status})=>{

    console.log("filteredTasks", filteredTasks);

    return (
        <>

        {filteredTasks.length > 0 ? filteredTasks.map(({description, completed, createdAt, updatedAt, _id})=>{
            return <Link to={`/dashboard/${_id}`} key={_id}>
            <div className="card">
                    <div className="card-left">  
                        <div><span>{completed ? <TiTick />: <TiTimesOutline/>}</span></div>
                        <div><p>{description}</p></div>
                        
                    </div>
                    <div className="card-right">
                        <div></div>
                        <div><span className="createdtAt">{moment(createdAt).format('DD MMMM h:mm a')}</span></div>
                        
                    {/* <h4>Last Update</h4>
                    <span>{moment(createdAt).format('DD MMMM h:mm A')}</span> */}
                    </div>
            </div>
            </Link>
        }):''}

        {page === 'dashboard' && status === 'loading' ?
        <div style={{margin: 'auto', width: '100px'}}>
        <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        />
        </div>: <div>{filteredTasks.length === 0 ? <h3>No Tasks</h3>: ''}</div>
        }
         
        </>
    )
}



const mapStateToProps = (state)=>{
    return {
        tasks: state.tasks,
        filteredTasks: filteredTasks(state.tasks, state.filters),
        page: state.statuses.page,
        status: state.statuses.status
    }
}

export default connect(mapStateToProps)(Tasks);