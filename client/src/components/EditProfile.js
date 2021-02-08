import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editProfile } from '../js/action/user';


const Edit = () => {
    const [toChange, setToChange] = useState({name:"",email:""})
    const dispatch = useDispatch();
    const current = useSelector((state) => state.userReducer.user);
    useEffect(() => {
        setToChange({name:current.name,email:current.email})
    }, [current])
    
    const handleChange=(e)=>{
        e.preventDefault();
        setToChange({...toChange,[e.target.name]:e.target.value})
    }

    
    
    
    return (
        <div>
            <div
      className="card input-filed"
      style={{
        margin: "300px",
        maxWidth: "1000px",
        padding: "20px",
        textAlign: "center",
      }}
    >


      <input
        type="text"
        placeholder="name"
        value={toChange.name}
        name="name"
        onChange={handleChange}

      />
      <input
        type="text"
        placeholder="email"
        value={toChange.email}
        name="email"
        onChange={handleChange}
      />
    <Link to="/profile">
      <button
        className="btn waves-effect blue darken-1"
        onClick={()=>dispatch(editProfile(current._id,toChange))}
      >
        Save
      </button>
      </Link>
    </div> 
        </div>
    )
}

export default Edit
