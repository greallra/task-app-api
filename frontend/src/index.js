import React from 'react';
import { render } from 'react-dom';
import Auth from './components/Auth';
import store from './store/configureStore';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/main.scss';

render(
<Provider store={store}>
    <Auth/>
</Provider>,   
document.getElementById('App'))

module.hot.accept();
/*
TREE

PROVIDER
    AUTH
        APP-ROUTER
            HOME
            HOME
            PROFILE
                LINK TO EDITPROFILE
            PROFILE
            EDITPROFILE
            EDITPROFILE
            DASHBOARD
                TASKSUMMARY
                TASKSUMMARY
                TASKFILTERS
                    (LINK TO TASK CREATE)
                TASKFILTERS
                TASKS
                    (LINK TO TASK EDIT)
                TASKS
            DASHBOARD
            TASKEDIT
                TASKFORM
            TASKEDIT
            TASKCREATE
                TASKFORM
            TASKCREATE
            LOGIN
                USERFORM
            LOGIN
            SINGUP
                USERFORM
            SINGUP
            INFO
            INFO
        APP-ROUTER
    AUTH
PROVIDER

*/