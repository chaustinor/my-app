import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

axios.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  });

export function getUsers(){
  return (dispatch, getState) => {
    axios.get('http://localhost:8080/users')
      .then(response => {
        dispatch(getUsersSuccess(response.data))
      });
  }
}

export function removeUser(user){
  return (dispatch, getState) => {
    axios.delete('http://localhost:8080/user', {data: {_id: user}})
      .then(response => {
        dispatch(getUsersSuccess(response.data))
      });
  }
}

export function addUser(user){
  return (dispatch, getState) => {
    axios.post('http://localhost:8080/user', user)
      .then(response => {
        dispatch(getUsersSuccess(response.data))
      });
  }
}

export function updateUser(user){
  return (dispatch, getState) => {
    axios.put('http://localhost:8080/user', user)
      .then(response => {
        dispatch(getUsersSuccess(response.data))
      });
  }
}

export function getUsersSuccess(users) {
  return {
  	type: 'USERS_FETCH_DATA_SUCCESS',
    users
  }
}

// export const addToList = item => ({
//   type: "ADD_TO_LIST",
//   item
// })

// export const popList = () => ({
//   type: "POP_LIST"
// })

// export const removeFromList = item => ({
//   type: "REMOVE_FROM_LIST",
//   item
// })

// export const list = (state = [], action) => {
//   switch(action.type) {
//     case "ADD_TO_LIST":
//       return state.concat(action.item)
//     case "POP_LIST":
//       return state.slice(0, state.length - 1)
//     case "REMOVE_FROM_LIST":
//       let index = state.indexOf(action.item)
// 	  return state.slice(index, 1)
//     default:
//       return state
//   }
// }

export const users = (state = [], action) => {
  switch(action.type) {
	case "USERS_FETCH_DATA_SUCCESS":
	  return action.users
	default:
	  return state
  }
}

export const reducers = combineReducers({
 users
})

export function configureStore(initialState = {}) {
  const store = createStore(
	reducers, 
	initialState,
    applyMiddleware(thunk)
  )
  return store
}

export const store = configureStore()