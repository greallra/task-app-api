import React from "react";
import Dashboard from './Dashboard';
import Profile from './Profile';
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Info from './Info';
import TaskEdit from './TaskEdit';
import TaskCreate from './TaskCreate';
import Home from './Home';
import EditProfile from './EditProfile';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//every private component checks for authentification, if not logged in, redirect to Profile page

export default function AppRouter() {
    return (
        <>
        <Router>  
           <Switch>
                <PublicRoute 
                    exact={true}
                    path="/" 
                    component={Home}
                />
                <PrivateRoute 
                    exact={true}
                    path="/profile" 
                    component={Profile}
                />
                <PrivateRoute 
                    path="/profile/edit-:field"
                    component={EditProfile}
                />
                 <PrivateRoute
                    exact={true}
                    path="/dashboard"
                    component={Dashboard}
                />
                 <PrivateRoute 
                    path="/dashboard/:id"
                    component={TaskEdit}
                />
                 <PrivateRoute 
                    path="/task_create"
                    component={TaskCreate}
                />
                <PublicRoute 
                    path="/login" 
                    component={Login}
                />
                <PublicRoute 
                    path="/signup" 
                    component={Signup}
                />
                {/* One Random Route */}
                <Route
                component={Info}
                />
               
            </Switch>
        </Router>
        </>
    )
}