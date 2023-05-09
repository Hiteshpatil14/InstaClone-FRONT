import React from 'react'
import "./addpost.css"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom'

function Addpost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [text, setText] = useState("");
  const [err, setErr] = useState(false)
  const [mess, setMess] = useState(false)
  const [loader,setLoader]=useState(false)

  useEffect(() => {
    console.log(err)
    if (url) {
      fetch("http://localhost:5000/addpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("tok")
        },
        body: JSON.stringify({
          title,
          body,
          img: url
        })
      })
        .then(res =>
          res.json()
        )
        .then(p => {
          if (p.error) {
            console.log(p.error)
            setText(p.error)
            setErr(true)
          }
          else {
            console.log(p.message)
            setText("post created successfully")
            setLoader(false)
            setMess(true)
            setErr(false)
            setTimeout(() => {
              navigate("/")
            }, 2000)
          }
        })
        .catch(err => console.log(err))
    }
  }, [url])
  const newpost = () => {
    const data = new FormData()
    data.append("file", image);
    data.append("upload_preset", "my_insta")
    data.append("cloude_name", "dnuve7mzq")
    fetch("https://api.cloudinary.com/v1_1/dnuve7mzq/image/upload", {
      method: "POST",
      body: data
    }).then(resp =>
      resp.json()
    ).then(res => {
      setUrl(res.url)
    })
      .catch(err =>
        console.log(err)
      )

  }


  return (
    <div className='main'>
      {err && (<Toast style={{ float: "right", margin: "20px 20px", fontSize: "1.3em", width: "400px", backgroundColor: "red", color: "white", fontWeight: "600" }}>
        <Toast.Header >
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>)}
      {mess &&
        (<Toast style={{height:"100px", float: "right", margin: "20px 20px", fontSize: "1.3em", width: "400px", backgroundColor: "green", color: "white", fontWeight: "600" }}>
          <Toast.Header >
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{text}</Toast.Body>
        </Toast>)}
        {loader &&
        (<Toast style={{height:"100px", float: "right", margin: "20px 20px", fontSize: "1.3em", width: "400px", backgroundColor: "gray", color: "white", fontWeight: "600" }}>
          <Toast.Header >
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body> Uploading...Please Wait</Toast.Body>
        </Toast>)}

      <div className='addpost'>
        
        <textarea type="text" onChange={(e) => {
          setBody(e.target.value)
        }} className='bodyinput' placeholder='Write caption here...' />
        <div className="file-field input-field filefield">
          <div className="btn">
            <input style={{ fontSize: "1.5em" }} onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
          </div>
          <div className="file-path-wrapper submitbutton">
            <Button variant="primary" onClick={() => {
              setLoader(true)
              newpost()
            }}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Addpost
