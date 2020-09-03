import React, { useState, useEffect } from 'react';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import {BsFilterLeft} from "react-icons/bs";
import { connect } from 'react-redux';
import { setFilter } from '../actions/filterActions';
import { Link } from 'react-router-dom';

const TaskFilters = ({setFilter})=>{
    let [filterBy, setFilterBy] = useState('');



    function onSelect({ key }) {
        console.log(`${key} selected`);
        setFilterBy(key);
      }
      
      function onVisibleChange(visible) {
        console.log("vis",visible);
      }

      useEffect(()=>{
        setFilter(filterBy)
      },[filterBy])

      const menu = (
        <Menu onSelect={onSelect}>
          <MenuItem key="last 24Hours">Last 24Hours</MenuItem>
          <Divider />
          <MenuItem key="last 3 days">Last 3 days</MenuItem>
          <Divider />
          <MenuItem key="last week">Last week</MenuItem>
          <Divider />
          <MenuItem key="Alphabetically">Alphabetically</MenuItem>
          <Divider />
          <MenuItem key="show all">Show All</MenuItem>
          {/* <Divider /> */}
        </Menu>
      );
    return (
        <div className="taskFilters-cont">
       <Link to="task_create" style={{color:'black'}}><button>create task</button></Link>
        <div>
          <Dropdown
            trigger={['click']}
            overlay={menu}
            animation="slide-up"
            onVisibleChange={onVisibleChange}
          >
          <button style={{ width: 100 }}>Filter By <BsFilterLeft style={{fontSize: '10px'}}/></button>
          </Dropdown>

        </div>
      </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setFilter: (filterBy)=>(dispatch(setFilter(filterBy)))
    }
}

export default connect(undefined, mapDispatchToProps)(TaskFilters);