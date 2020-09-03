import { createStore, applyMiddleware, compose, combineReducers} from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import filtersReducer from '../reducers/filtersReducer';
import userReducer from "../reducers/userReducer";
import tasksReducer from '../reducers/tasksReducer';
import authReducer from '../reducers/authReducer';
import statusesReducer from "../reducers/statusesReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const combined = combineReducers({
    user: userReducer,
    filters: filtersReducer,
    tasks: tasksReducer,
    auth: authReducer,
    statuses: statusesReducer
})

const store = createStore(combined, 
    composeEnhancers(applyMiddleware(thunk))
)

export default store