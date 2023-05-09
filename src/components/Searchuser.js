// import React from 'react'
// import "./profile.css"
// import Button from 'react-bootstrap/Button';
// import { useContext, useEffect, useState } from 'react';
// import { newcontext } from '../App';
// import { useNavigate ,useParams} from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
// import { FcLike } from "react-icons/fc"
// import { FaRegComment } from "react-icons/fa"



// function Searchuser() {
//     const userid=useParams("id")
//     console.log(userid)
//     const navigate = useNavigate()
//     const { state, dispatch } = useContext(newcontext)
    
//     // dispatch({type:"USER",payload:localStorage.getItem("userd")})
//     const [data, setData] = useState([])
//     useEffect(() => {
//         fetch("http://localhost:5000/searchprofile", {
//             method:"post",
//             headers:{
//             "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 userid
//             })
//         }).then(resp =>
//             resp.json())
//             .then(res => {
//                 console.log(res)
//                 setData(res.res)
//             })
//     }, [])
//     return (
//         <div className='profile'>
//             <div className='userDetail'>
//                 <div className='userPic'>
//                     <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXIlMjBpbWFnZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
//                 </div>
//                 <div className='userAppData'>
//                     <h1></h1>
//                     <li>
//                         <ul>5 Posts</ul>
//                         <ul>30 Followers</ul>
//                         <ul>50 Following</ul>
//                     </li>

//                 </div>
//                 <Button style={{ fontSize: "1.3em", height: "50px", marginLeft: "800px" }} variant="danger"
//                     onClick={() => {
//                         dispatch({ type: "LOGOUT" })
//                         navigate("/signin")
//                     }}
//                 >
//                     Logout
//                 </Button>
//             </div>
//             <div
//                 className='userPost'>
//                 {data.map((element) => {
//                     return (
//                         <Card className='cardbox' key={element._id} >
//                             <Card.Title style={{ fontSize: "2em", margin: "10px 10px" }} className='postheading'>{element.title}</Card.Title>

//                             <Card.Img variant="top" className='cardimage' src={element.photo} />
//                             <Card.Body>
//                                 <span className='likeicone'><FcLike /></span><span className='commenticone'><FaRegComment /></span>

//                                 <Card.Text className='body'>
//                                     {element.body}
//                                 </Card.Text>

//                             </Card.Body>
//                         </Card>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Searchuser
import { useNavigate ,useParams} from 'react-router-dom';
import React, { useContext } from 'react'
import {FcLike,FcLikePlaceholder} from "react-icons/fc"
import { FaRegComment ,FaUserCircle} from 'react-icons/fa'
import {BiLike,BiDislike} from "react-icons/bi"
import { useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import "./searchuser.css"
import {newcontext} from "../App"


function Searchuser() {
 
  const [userinfo,setUserinfo]=useState({})
  const [refresh,setRefresh]=useState(false)
  const [write,setWrite]=useState("")
  const [postid,setPostid]=useState()
  const [commentdata,setCommentdata]=useState([])
  const [commenttoggle,setCommenttoggle]=useState(true) 
  const [followers,setFollowers]=useState() 
  const [following,setFollowing]=useState()
  const userid=useParams("id")
  const navigate = useNavigate()
  const { state, dispatch } = useContext(newcontext)
  
  const [toggle,setToggle] =useState()
  
      
      // dispatch({type:"USER",payload:localStorage.getItem("userd")})
      const [data, setData] = useState([])
      useEffect(() => {
          fetch("http://localhost:5000/searchprofile", {
              method:"post",
              headers:{
              "Content-Type":"application/json"
              },
              body:JSON.stringify({
                  userid
              })
          }).then(resp =>
              resp.json())
              .then(res => {
                if(res.result.followers.includes(JSON.parse(localStorage.getItem("userd"))._id))
                {
                 setToggle(false)
                }else{ setToggle(true)}
                 setUserinfo(res.result)
                 setFollowers(res.result.followers.length)
                 setFollowing(res.result.following.length)
              
                  setData(res.res)
              })
      }, [])
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

function followuser(uid){
  fetch("http://localhost:5000/follow",
  {
    method:"put",
    headers:{
      "Content-Type":"application/json",
     "Authorization":"Bearer "+localStorage.getItem("tok")
    },
    body:JSON.stringify({
      id:uid
    })
  }).then(res=>
    res.json()
  )
  .then(res=>{
    if(res.data.followers.includes(JSON.parse(localStorage.getItem("userd"))._id))
    {
     setToggle(false)
    }else{ setToggle(true)}
    setFollowers(res.data.followers.length)
    setFollowing(res.data.following.length)
    console.log(res.res,res.data)
  })
  
}
function unfollowuser(uid){
  fetch("http://localhost:5000/unfollow",
  {
    method:"put",
    headers:{
      "Content-Type":"application/json",
     "Authorization":"Bearer "+localStorage.getItem("tok")
    },
    body:JSON.stringify({
      id:uid
    })
  }).then(res=>
    res.json()
  )
  .then(res=>{
    setToggle(true)
    setFollowers(res.data.followers.length)
    setFollowing(res.data.following.length)
    console.log(res.res,res.data)
  })
  
}
const popover = (
                  
  <Popover style={{textAlign:"center"}} id="popover-basic">
   { commenttoggle && commentdata.map((item,index)=>{
      return(
        <p key={index}><b>{item.name} </b>{item.comment}</p>
      )
    }
      )}
    <Popover.Header as="h3">write your comment here...</Popover.Header>
    <input type="text" value={write} onChange={(e)=>{
     setWrite(e.target.value)
    }}  />
    <Button onClick={()=>{
      
      comment()
    }} style={{ marginLeft: "15px", marginTop: "20px" }} variant="primary" >
        Comment
      </Button>
  </Popover>
)
  return (
    <>
   <div className='userDetail'>
                <div className='userPic'>
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXIlMjBpbWFnZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
                <div className='userAppData'>
                    <h1 className='username'>{userinfo.name}</h1>
                   
                    <h4 className='useremail'>{userinfo.email}</h4>
                    <li>
                        <ul><b>{data.length}</b> Posts</ul>
                        <ul><b>{followers}</b> Followers</ul>
                        <ul><b>{following}</b> Following</ul>
                    </li>

                  { toggle  && < Button style={{position:"relative",bottom:"72px",left:"5px",padding:"8px 40px",fontWeight:"600",fontSize:"1.1em",borderRadius:"10px"}} variant="primary"
                     onClick={()=>{
                       followuser(userinfo._id)
                     }} >
              Follow
            </Button>}
            { !toggle  && < Button style={{position:"relative",bottom:"72px",left:"5px",padding:"8px 40px",fontWeight:"600",fontSize:"1.1em",borderRadius:"10px"}} variant="primary"
                     onClick={()=>{
                      unfollowuser(userinfo._id)
                    }}  >
              UnFollow
            </Button>}
                </div>
                <Button style={{ fontSize: "1.3em", height: "50px", marginLeft: "800px" }} variant="danger"
                    onClick={() => {
                        dispatch({ type: "LOGOUT" })
                        navigate("/signin")
                        localStorage.clear()
                    }}
                >
                    Logout
                </Button>
            </div>
 
    <div className='main'>
        {data.map((element)=>{
          return(
            
<Card className='userpost' style={{   boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.5)'}} key={element._id} >
            {/* <Card.Title style={{fontSize:"2em", margin:"10px 10px"}} className='postheading'>{< FaUserCircle/>}<span style={{margin:"10px",position:"relative",top:3}}>{element.title}</span></Card.Title> */}
            
          <Card.Img variant="top" className='cardimage' src={element.photo} />
          <Card.Body className='cardbody'>
            
            <span onClick={()=>{
             
                likepost(element._id)
                
          
            }} className='likeicone'><BiLike/></span>
            <span className='Dislikeicone' onClick={()=>{
      
              unlikepost(element._id)}
           }
               
           ><BiDislike /></span>
             <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <span className='commenticone' onClick={()=>{
      
      setCommentdata(element.commentby)
      setPostid(element._id)
    }}><FaRegComment /></span>
  </OverlayTrigger>
            
            <div className='likecount' >{element.likes} likes</div>
            <Card.Text className='body'>
              {element.body}
            </Card.Text>
          </Card.Body>
        </Card>
          )
        })}
        
        
     </div>
     </>
  )
}

export default Searchuser
