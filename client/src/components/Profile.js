import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../js/action/post";
import {getcurrent} from "../js/action/user"
import CardProfile from "./CardProfile";
import { Link } from "react-router-dom";


const Profile = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.userReducer.user);
  const myPosts = useSelector((state) => state.postReducer.posts);
  const loadPosts = useSelector((state) => state.postReducer.loadPosts);
  
  
  
  useEffect(() => {
    dispatch(getUserPosts());
    dispatch(getcurrent())
  }, []);
  return (
    <div>
{ !current ?<div className="progress">
<div className="indeterminate"></div>
</div>:<div style={{ maxWidth: "550px", margin: "0px auto" }}>
<div
  style={{
    display: "flex",
    justifyContent: "space-around",
    margin: "18px 0px",
    borderBottom: "1px solid grey",
  }}
>
  <div>
    <img
      style={{ width: "160px", height: "160px", borderRadius: "80px" }}
    src={current?current.url:""}
    />
  </div>
  <div>
    <h4>{current?current.name:"loading"}
    <Link to="/editprofile">
    <i
      class="material-icons"
      style={{ float: "right" ,marginLeft:'50px'}}
      
    >
       edit
    </i>
    </Link>
    </h4>
    <h6>{current.email}</h6>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "120%",
      }}
    >
      <h6>{myPosts.length} posts</h6>
      <h6>{!current.followers?  <div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>:current.followers.length} followers</h6>
      <h6>{!current.following?  <div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>:current.following.length} following</h6>
    </div>
  </div>
</div>
<div className="gallery">
  {loadPosts ? (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  )  : (
    myPosts.map((el) => {
      return <CardProfile el={el} current={current} key={el._id} />;
    })
  )}
</div>
</div>}

</div>
    
  );
};

export default Profile;
