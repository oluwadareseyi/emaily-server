import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: actionTypes.FETCH_USER,
    userAuth: res.data
  });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({
    type: actionTypes.FETCH_USER,
    userAuth: res.data
  });
};
