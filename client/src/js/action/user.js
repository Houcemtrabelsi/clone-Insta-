import {
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FAIL_USER,
  REGISTER_USER,
  CURRENT_USER,
  GET_USERS_LOAD,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "../const/user";
import axios from "axios";
import M from "materialize-css";

export const registerUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      M.toast({
        html: "Ivalid email",
        classes: "#e53935 red darken-1",
      });
      return;
    }
    const result = await axios.post("/signup", user);
    dispatch({ type: REGISTER_USER, payload: result.data });
    M.toast({ html: result.data.message, classes: "#43a047 green darken-1" });
    history.push("/login");
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
    M.toast({
      html: error.response.data.error,
      classes: "#e53935 red darken-1",
    });
    console.log(error);
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/signin", user);
    dispatch({ type: LOGIN_USER, payload: result.data });
    M.toast({ html: "signed in sucess", classes: "#43a047 green darken-1" });
    history.push("/");
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
    M.toast({
      html: error.response.data.error,
      classes: "#e53935 red darken-1",
    });
  }
};

export const getcurrent = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    let result = await axios.get("/current", options);
    dispatch({ type: CURRENT_USER, payload: result.data.user });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const getUsers = () => async (dispatch) => {
  try {
    let result = await axios.get("/users");
    dispatch({ type: GET_USERS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  axios
    .delete(`/deleteuser/${id}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};

export const editProfile = (id, newProfile) => async (dispatch) => {
  axios
    .put(`/updateprofile/${id}`, newProfile)
    .then((res) => {
      dispatch(getcurrent());
      M.toast({ html: res.data.message, classes: "#43a047 green darken-1" });
    })
    .catch((err) => console.log(err));
};

export const getUser = (id) => async (dispatch) => {
  axios
    .get(`/user/${id}`)
    .then((res) => dispatch({ type: GET_USER, payload: res.data }))
    .catch((err) => console.log(err));
};

export const followUser = (followId) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
 

  axios
    .put("/follow", {followId}, options)
    .then((res) => {dispatch(getUser(followId));
    })
    .catch((err) => console.log(err));
};


export const unfollowUser = (unfollowId) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
 

  axios
    .put("/unfollow", {unfollowId}, options)
    .then((res) => {dispatch(getUser(unfollowId));
     
    })
    .catch((err) => console.log(err));
};



