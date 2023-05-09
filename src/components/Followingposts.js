import React, { useContext } from 'react'
import {FcLike,FcLikePlaceholder} from "react-icons/fc"
import { FaRegComment ,FaUserCircle} from 'react-icons/fa'
import {BiLike,BiDislike} from "react-icons/bi"
import { useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';

import "./homepost.css"
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import {newcontext} from "../App"


function Followingpost() {
  const {state,dispatch}=useContext(newcontext)
  const [data,setData]=useState([])
  const [refresh,setRefresh]=useState(false)
  const [write,setWrite]=useState("")
  const [postid,setPostid]=useState()
  const [commentdata,setCommentdata]=useState([])
  const [commenttoggle,setCommenttoggle]=useState(true)  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(data)
  
  useEffect(()=>{
   fetch(`http://localhost:5000/followedpost/${JSON.parse(localStorage.getItem("userd"))._id}`,{
    
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("tok")
    }
   }).then(resp=>
    resp.json()
   ).then((res)=>{
    console.log(res)
    setData(res)
    
   })
  },[refresh])
  
  function likepost(id){
      fetch("http://localhost:5000/like",{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("tok")
        },
        body:JSON.stringify({
         
            postid:id
          
        })
      }).then(resp=>resp.json())
      .then(res=>{
        console.log(res)
       setRefresh(!refresh)
      })
      .catch(err=>console.log(err))
  }
  function unlikepost(id){
    
    
    fetch("http://localhost:5000/unlike",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("tok")
      },
      body:JSON.stringify({
       
          postid:id
        
      })
    }).then(resp=>resp.json())
    .then(res=>{
      setRefresh(!refresh)
      console.log(res)
      
    })
    .catch(err=>console.log(err))
}

function comment(){
  fetch("http://localhost:5000/comment",{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("tok")
    },
    body:JSON.stringify({
      comment:write,
      commentid:postid
      // name: username
    })
  }).then((resp)=>
    resp.json()
  )
  .then((res)=>{
    setCommentdata(res.commentby)
    console.log(res)
    
    
  })
  .catch(err=>{
    console.log(err)
  })
}


  return (
    <div className='homemain'>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Comment Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { commenttoggle && commentdata.map((item,index)=>{
      return(
        <p style={{fontSize:"1.3em"}} key={index}><b>{item.name} </b>{item.comment}</p>
      )
    }
      )}
       </Modal.Body>
        <Modal.Footer>
        <input type="text" value={write} onChange={(e)=>{
     setWrite(e.target.value)
    }}  />
    <Button onClick={()=>{
      
      comment()
      setWrite("")
    }} style={{ marginLeft: "15px", marginTop: "20px" }} variant="primary" >
        Comment
      </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        {data.map((element)=>{
          return(
            
<Card className='homecardbox' style={{   boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.5)'}} key={element._id} >
            <Card.Title style={{fontSize:"2em", margin:"10px 10px"}} className='homepostheading'>{< FaUserCircle/>}<span style={{margin:"10px",position:"relative",top:3}}>{element.postedBy.name}</span></Card.Title>
            
          <Card.Img variant="top" className='homecardimage' src={element.photo} />
          <Card.Body>
            
            <span onClick={()=>{
             
                likepost(element._id)
                
          
            }} className='homelikeicone'><BiLike/></span>
            <span className='homeDislikeicone' onClick={()=>{
      
              unlikepost(element._id)}
           }
               
           ><BiDislike /></span>
            
             <span className='homecommenticone' onClick={()=>{
      
      setCommentdata(element.commentby)
      setPostid(element._id)
    handleShow()
    }}><FaRegComment /></span>
      
    
  
            
            <div className='homelikecount' >{element.likes} likes</div>
            <Card.Text className='homebody'>
              {element.body}
            </Card.Text>
          </Card.Body>
        </Card>
          )
        })}
        
        
     </div>

  )
}

export default Followingpost
