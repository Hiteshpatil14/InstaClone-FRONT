import React, { useState,useEffect } from 'react';
import "./navbar.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {newcontext} from "../App"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {GiHamburgerMenu} from "react-icons/gi"

function Navbar() {
   const {state,dispatch}=useContext(newcontext)
   const [show, setShow] = useState(false);
   const [input,setInput]=useState("")
   const [arr,setArr]=useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  function uploadpic(){

  }
  function getlist(inp){
    setInput(inp)
    if(inp){
     fetch("http://localhost:5000/searchuser",{
      method:"post",
      headers:{
       "Content-Type":"application/json",
       
      },
      body:JSON.stringify({
        text:inp
      })
     })
     .then(res=>res.json())
     .then(resp=>{
      // setArr(typeof(resp))
      setArr(resp.res)
     
     })
     .catch(err=>console.log(err))
    }
  }
  return (
    <div className="navbar">
        <div className="header">
            <img src="" alt="" />
            <Link  style={{textDecoration:"none"}} to={state?"/":"/signin"}> <h1 >HITPOST</h1></Link>
        </div>
       <div className="screens">
            <li>
            <input onClick={handleShow}  type="text" placeholder="search other users" />
            <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><input value={input} onChange={(e)=>{
           getlist(e.target.value)
          }}  type="text" placeholder="search other users" /></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "300px", overflowY: "scroll" }}>
        <ListGroup>
          {arr.map((item,index)=>{
            return(
            
            <ListGroup.Item style={{fontSize:"1.5em"}} onClick={()=>{
            if(item._id===JSON.parse(localStorage.getItem("userd"))._id){
              navigate("/profile")
              handleClose()
              setInput("")
              setArr([])
              window.location.reload();
              
            }
            else{
              navigate(`/profile/${item._id}`)
              handleClose()
              setInput("")
              setArr([])
              window.location.reload();
              
            }
            }} key={index}>{item.email}</ListGroup.Item>
            )
          })}
      
      
    </ListGroup>

        </Modal.Body>
     
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
     {state &&
     <>
   
     <Link to="/newpost"><button>Add Post</button></Link>
      <Link to="/profile"><button>Profile</button></Link>
      <Dropdown>

      <Dropdown.Toggle variant="success" id="dropdown-basic">
      <GiHamburgerMenu />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{border:"2px solid black"}}>
        <Dropdown.Item style={{height:"60px"}}  >  <Link to="/followedpost"><button style={{ fontSize: "1em", height: "40px"}}>Followed Posts</button></Link></Dropdown.Item>
        {/* <Dropdown.Item style={{height:"60px"}} > <input placeholder='Update Profile' style={{ fontSize: "1em", height: "40px"}} onClick={()=>uploadpic()} type="file" /></Dropdown.Item> */}
        <Dropdown.Item style={{height:"80px",textAlign:"center"}}><Button className='logoutbutton' style={{ fontSize: "1em", height: "40px",marginLeft:"50px",backgroundColor:"red",color:"white",border:"2px solid black"}} variant="danger"
                    onClick={() => {
                        dispatch({ type: "LOGOUT" })
                        navigate("/signin")
                        localStorage.clear()
                    }}
                >
                    Logout

                </Button></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </>
     }
    
      {!state &&
     <>
        <Link to="/signin"><button>Sign In</button></Link>
      <Link to="/signup"><button>Sign Up</button></Link>
      </>
     }
               
            </li>
        </div>
    </div>
  )
}

export default Navbar
