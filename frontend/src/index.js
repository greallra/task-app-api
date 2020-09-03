import React from 'react';
import { render } from 'react-dom';
import Auth from './components/Auth';
import store from './store/configureStore';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/main.scss';
import Mod from './components/Mod';

// const handleClick = ()=>{
//     store.dispatch({
//         type: 'CREATE_TASK',
//         newTask: {
//             _id: '17',
//             description: 'fffffff',
//             completed: true
//         }
//     })
// }
// const handleClick2 = ()=>{
//     store.dispatch({
//         type: 'DELETE_TASK',
//         id: '17'
//     })
// }
// const handleClick3 = ()=>{
    // store.dispatch({
    //     type: 'TEST'

    // })
// }
{/* <button onClick={handleClick}>create</button>
<button onClick={handleClick2}>delete</button>
<button onClick={handleClick3}>update</button> */}
// async function funk(){

//     const users = await fetch('https://jsonplaceholder.typicode.com/posts');
//    console.log(users);
// }
// funk()
// const Hey = ()=>{
    
//     return <div>hry</div>
// }


render(
<Provider store={store}>
    <Auth/>

</Provider>,   
document.getElementById('App'))

module.hot.accept();