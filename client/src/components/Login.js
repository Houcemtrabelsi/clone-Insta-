import React from "react";
import { Link,useHistory } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../js/action/user";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history=useHistory()
  return (
    <div className="mycard ">
      <div className="card auth-card input-field">
        <h2>Welcome</h2>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect blue"
          onClick={() => dispatch(loginUser({ email, password },history))}
        >
          Login
        </button>
        <h5>
          <Link to="/signup">Don't have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
