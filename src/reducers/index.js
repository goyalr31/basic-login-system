import issueConstants from '../constants/issueConstants';
import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

const initState = {
  user: '',
  feedbackDetail: [],
  productList: [],
  productDetail: {},
  isAuthed: false
}

const login = (state=initState, action) => {
  switch (action.type) {
    
    case issueConstants.LOGIN:
      return {
        ...state,
        isAuthed: action.isAuthenticated,
        user: action.user
      }
      case issueConstants.LOGOUT: 
      return {
        ...state,
        ...initState,
      }
    default:
      return state;
  }
}

const submitFeedback = (state = initState, action) => {
  switch (action.type) {

    case issueConstants.SUBMIT_FEEDBACK:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

// const productList = (state = initState, action) => {
//   switch (action.type) {

//     case issueConstants.PURCHASED_ITEMS:
//       return {
//         ...state,
//         ...action.payload
//       }
//     default:
//       return state;
//   }
// };



export const getLoginState = state => state.login;
export const getFeedbackState = state => state.submitFeedback;

export default combineReducers({
  login,
  submitFeedback
});
