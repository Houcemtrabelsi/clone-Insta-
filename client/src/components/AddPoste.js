import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const AddPoste = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          body,
          url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            M.toast({
              html: data.error,
              classes: "#e53935 red darken-1",
            });
          } else {
            M.toast({ html: "posted", classes: "#43a047 green darken-1" });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);
  const postDetails = () => {
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
        if (data.error) {
          M.toast({
            html: data.error.message,
            classes: "#e53935 red darken-1",
          });
        } else {
          setUrl(data.url);
        }
      });
  };
  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div className="file-field input-field ">
        <div className="btn blue darken-1">
          <span>Upload File</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        className="btn waves-effect blue darken-1"
        onClick={() => postDetails()}
      >
        Submit
      </button>
    </div>
  );
};

export default AddPoste;
