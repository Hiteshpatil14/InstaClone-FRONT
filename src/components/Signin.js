import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./signin.css"
import { useState ,useContext} from 'react';
import {newcontext} from "../App"
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom'

function Signin() {
  const {state,dispatch}=useContext(newcontext)
  const navigate = useNavigate()
  const [text, setText] = useState("");
  const [err, setErr] = useState(false)
  const [mess, setMess] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const logindata = () => {
    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {
        email, password
      })
    }).then(resp =>
      resp.json()
    ).then(p => {
      if(p.error) {
        setText(p.error)
        setErr(true)
        console.log("invalid")
      }
      else {
        console.log(p)
        localStorage.setItem("tok",p.Token)

        localStorage.setItem("userd",JSON.stringify(p.userdetail))
        dispatch({type:"USER",payload:p.userdetail})

        setText("signin success")
        setMess(true)
        setErr(false)
        setTimeout(()=>{
          navigate("/")
        },2000)

      }
    })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <>
    {err && (<Toast style={{ float: "right", margin: "20px 20px", fontSize: "1.3em", width: "400px", backgroundColor: "red", color: "white", fontWeight: "600" }}>
        <Toast.Header >
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>)}
      {mess &&
        (<Toast style={{ float: "right", margin: "20px 20px", fontSize: "1.3em", width: "400px", backgroundColor: "green", color: "white", fontWeight: "600" }}>
          <Toast.Header >
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{text}</Toast.Body>
        </Toast>)}

    <Form className='signinform'>
      <div className='text'>
        <h1>Instagram</h1>
      </div>

      <Form.Group className="mb-3 email" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => {
          setEmail(e.target.value)
        }} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3 password" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e) => {
          setPassword(e.target.value)
        }} type="password" placeholder="Password" />
      </Form.Group>

      <Button style={{ marginLeft: "15px", marginTop: "20px" }} variant="primary" 
        onClick={() => {
          logindata()
        }}
      >
        Sign In
      </Button>
    </Form>
    </>
  )
}

export default Signin
