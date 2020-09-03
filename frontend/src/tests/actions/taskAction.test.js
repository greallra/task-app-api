import configureStore from 'redux-mock-store';
import {createTask, startCreateTask} from '../../actions/taskActions';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

it('should dispatch create task action', () => {

    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)
  
    // Dispatch the action
    store.dispatch(createTask({description:'banana', completed:true}))
  
    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = { type: 'CREATE_TASK', newTask: {description:'banana', completed:true} }
    expect(actions).toEqual([expectedPayload])
  })

test('should add task to database and store', (done) => {
  const store = mockStore({});
  const task = {
    description: 'banana',
    completed: false
  };


});

describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })
  
    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
      fetchMock.getOnce('/todos', {
        body: { todos: ['do something'] },
        headers: { 'content-type': 'application/json' }
      })
  
      const expectedActions = [
        { type: types.FETCH_TODOS_REQUEST },
        { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
      ]
      const store = mockStore({ todos: [] })
  
      return store.dispatch(actions.fetchTodos()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

