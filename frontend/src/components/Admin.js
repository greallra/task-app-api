import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useTable } from 'react-table';
import axios from 'axios';

const Admin = ()=>{
    console.log("render comp");
    const [users, setUsers] = useState([])
    const [data, setData] = useState([])

    useEffect(()=>{
        console.log("effect rain", users);
    },[])

    useEffect(()=>{
        console.log("users effect rain", users);
        if(users.length > 0) {
            const data = users.map((user, i)=>{
                return {
                    col1: user._id,
                    col2: user.name,
                   col3: user.email,
                   col4: user.age
                }
            })
            setData(data)
        }
    },[users])
 
    // const data = React.useMemo(
    //     () => [
    //       {
    //         col1: d._id,
    //         col2: d.name,
    //         col3: d.email,
    //         col4: d.age
    //       },
    //       {
    //         col1: d._id,
    //         col2: d.name,
    //         col3: d.email,
    //         col4: d.age
    //       }
        
    //     ],
    //     []
    //   )
      const columns = React.useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Name',
            accessor: 'col2',
          },
          {
            Header: 'Email',
            accessor: 'col3',
          },
          {
            Header: 'Age',
            accessor: 'col4',
          },
          {
            Header: 'Avatar',
            accessor: 'col5',
          },
        ],
        []
      )
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })

      useEffect(()=>{
        async function fetchData() {
            try {
                const users = await axios.get(`${process.env.API_URL}/users`);
                setUsers(users.data)
            } catch (e) {
                console.log(e);
            } 
        }
        fetchData();
      },[])
    return (
        <>
            <nav>
                <ul>
                    <li>
                    <NavLink to="/admin" >Home</NavLink>
                    </li> 
                  
        
                </ul>
            </nav>

            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
        </>
    )
}

export default Admin;