import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../js/action/user";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = localStorage.getItem("token");
  const isAuth2 = useSelector(state => state.userReducer.isAuth)
  const current = useSelector((state) => state.userReducer.user);
  
  useEffect(() => {
    navRender();
  }, [isAuth,isAuth2]);

  const navRender = () => {
    if (isAuth2) {
      return (
        <>
          <li key="1">
            <Link to={current.role=="admin"?"/profileadmin":"/profile"}>Profile</Link>
          </li>
          <li key="2">
            <Link to="/addposte">New post</Link>
          </li>
          <button
            className="btn #d32f2f red darken-2 "
            key="6"
            onClick={() => {
              dispatch(Logout());
              history.push("/login");
            }}
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <li key="3">
            <Link to="/login">Login</Link>
          </li>
         
          <li key="4">
            <Link to="/signup">Signup</Link>
          </li>
        
        </>
      );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper blue">
        <Link to="/" className="brand-logo left">
          InstaCovid
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {navRender()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
