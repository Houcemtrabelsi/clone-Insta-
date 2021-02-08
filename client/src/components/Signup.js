import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../js/action/user";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(url){
      dispatch(registerUser({ name, email, password, url }, history))
    }

  }, [url])

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "project");
    data.append("cloud_name", "djrx5huus");
    fetch("https://api.cloudinary.com/v1_1/djrx5huus/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postData = ({ name, email, password, url },history) => {
    if (image) {
      uploadPic();
      
    } else {
      dispatch(registerUser({ name, email, password, url }, history));
    }
  };
  return (
    <div>
      <div className="mycard ">
        <div className="card auth-card input-field">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="name"
            // value="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email"
            // value="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            // value="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="file-field input-field ">
            <div className="btn blue darken-1">
              <span>Upload File</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>

          <button
            className="btn waves-effect blue"
            onClick={() =>
              postData({ name, email, password, url },history)
            }
          >
            Signup
          </button>
          <h5>
            <Link to="/login">Already have an acount ?</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Signup;
