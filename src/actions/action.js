import { createAction } from 'redux-actions';
import axios from 'axios';
import issueConstants from '../constants/issueConstants';



export const logoutMe = createAction(issueConstants.LOGOUT);
// export const submitFB = createAction(issueConstants.SUBMIT_FEEDBACK);

export function loginAction(data) {
  return dispatch => {
    axios.get('http://localhost:4000/users')
      .then((res) => {
        console.log(res)
        let value = res.data
        var result = value.find(val => val.username===data.username && val.password===data.password)  
        if(result) {
            dispatch(LoginMe(true))
          }
          else {
            dispatch(LoginMe(false))
          }
        })
  }
} 
export function LoginMe(isAuthenticated) {
  return {
    type: 'LOGIN',
    isAuthenticated
  }
}
// LOGOUT ACTION
export function logout() {
    return (dispatch) => {
      dispatch(logoutMe())
    }
  }

export async function addUser(data) {
  return await axios.post('http://localhost:4000/users', data)
        .then((res) => {
        // console.log(res)
        if(res.status === 201){
          return res;
        }
        else{
          return null;
        }
      });
}

export async function editUser(data) {
  return await axios.put('http://localhost:4000/users/'+data.id, data)
        .then((res) => {
        // console.log(res)
        if(res.status === 200){
          return res;
        }
        else{
          return null;
        }
      });
}

export async function getUser() {
  const response = await  axios.get('http://localhost:4000/users')
      .then((res) => {
        if(res.status === 200){
          return res.data;
        }
        else{
          return null;
        }
      });
    return response;
}

export async function removeUser(id) {
  const response = await axios.delete('http://localhost:4000/users/'+id)
      .then((res) => {
        // response = res;
        if(res.status === 200){
          return res;
        }
        else{
          return null;
        }
      });
  return response;
}