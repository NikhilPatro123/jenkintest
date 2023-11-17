import {
  LOADING_UI,
  SET_ERROR,
  CLEAR_ERRORS,
  SET_USER,
  SET_UNAUTHENTICATED,
  SERVER_ERROR,
} from "../types";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const adminLogin = (adminData, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const { data } = await axios.post(`${baseUrl}/admin/login`, adminData);
    const jwt = `Bearer ${data.token}`;
    localStorage.setItem("jwt", jwt);
    axios.defaults.headers.common["Authorization"] = jwt;
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: SET_USER });
    history.push("/admin/dashboard");
  } catch (error) {
    console.log(error);
    if (error.response.status === 404) {
      dispatch({
        type: SET_ERROR,
        payload: "User doesn't exists",
      });
    } else if (error.response.status === 401) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data,
      });
    } else {
      dispatch({
        type: SERVER_ERROR,
        payload: "Server error , try again later !!",
      });
    }
  }
};

export const logoutAction = (history) => (dispatch) => {
  localStorage.removeItem("jwt");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (history) history.push("/adminui");
};
