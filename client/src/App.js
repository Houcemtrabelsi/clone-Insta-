import Navbar from './components/Navbar'
import "./App.css"
import{BrowserRouter,Route,Switch}from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Profile from "./components/Profile"
import ProfileAdmin from "./components/ProfileAdmin"
import Signup from "./components/Signup"
import AddPoste from "./components/AddPoste"
import Error from "./components/Error"
import EditProfile from "./components/EditProfile"
import PrivatRoute from "./components/router/PrivatRoute"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getcurrent } from './js/action/user'
import Edit from './components/Edit'
import UserProfile from "./components/UserProfile"


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getcurrent())
  }, [])
  return (
    <BrowserRouter>
    <Navbar/>
       <Switch>
    <PrivatRoute exact path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <PrivatRoute exact path={"/profile"} component={Profile}/>
    <PrivatRoute path={"/profile/:userid"} component={UserProfile}/>
    <PrivatRoute path={"/profileadmin"} component={ProfileAdmin}/>
    <Route path="/signup" component={Signup}/>
    <PrivatRoute exact path="/addposte" component={AddPoste}/>
    <PrivatRoute exact path="/edit" component={Edit}/>
    <PrivatRoute exact path="/editprofile" component={EditProfile}/>
    <Route path="/*" component={Error}/>
    </Switch>
    </BrowserRouter>

  );
}

export default App;
