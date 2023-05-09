// import Home from "./components/Home";
import React from "react";
import { createContext } from "react";
import {reducer,firststate} from "./reducer/reducer"
import { useReducer,useEffect,useContext } from "react";
import Homeposts from "./components/Homeposts";
import Navbar from "./components/Navbar"
import {Route,Routes,useNavigate} from "react-router-dom"
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Addpost from "./components/Addpost";
import Searchuser from "./components/Searchuser"
import { useLocation } from "react-router-dom";
import Followingpost from "./components/Followingposts";

export const newcontext=createContext()


function Allroute(){
    const {state,dispatch}=useContext(newcontext)
    const navigate=useNavigate()
    const location = useLocation();
  
    useEffect(()=>{
    
     const signincheck=localStorage.getItem("userd")
     console.log(typeof(signincheck))
     if(signincheck){
      console.log("yes working")
      dispatch({type:"USER",payload:signincheck})
      
      if (location.pathname == "/") {
        navigate("/");
      }
      //  navigate("/")
     }else{
      navigate("/signin")
     }
    },[])
return(
     <Routes >
    <Route exact path="/" element={<Homeposts />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route path="/newpost" element={<Addpost />} />
    <Route  path="/profile/:id" element={<Searchuser />}/>
    <Route path="/followedpost" element={<Followingpost />} />
    </Routes>
    
)


}
function App() {

  
  const [state,dispatch]=useReducer(reducer,firststate)
  return (
    <newcontext.Provider value={{state,dispatch}}>
    {/* <BrowserRouter> */}
    <Navbar />
    <Allroute />
    {/* </BrowserRouter> */}
    </newcontext.Provider>
    
  )
}

export default App;

