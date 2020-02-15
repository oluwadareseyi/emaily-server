import * as actionTypes from "../actions/actionTypes";

// const initialState = {
//   userAuth: null
// };

const reducers = (state = null, action) => {
  //   console.log(action);

  switch (action.type) {
    case actionTypes.FETCH_USER:
      return action.userAuth || false;

    default:
      return state;
  }
};

export default reducers;
