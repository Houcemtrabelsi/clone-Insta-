import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivatRoute = ({ component: Component, ...rest }) => {
  const authorization = localStorage.getItem("token");
  if (authorization) {
    return <Route component={Component} {...rest} />;
  }
  return <Redirect to="/login" />;
};

export default PrivatRoute;
