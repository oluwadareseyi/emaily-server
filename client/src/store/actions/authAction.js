import axios from "axios";
import * as actionTypes from "./actionTypes";

export const userAction = userAuth => {
  return {
    type: actionTypes.FETCH_USER,
    userAuth: userAuth
  };
};

export const fetchUser = () => {
  return async dispatch => {
    const user = await axios.get("/api/current_user");
    dispatch(userAction(user));
  };
};
