import React from 'react'
import "./profile.css"
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import { newcontext } from '../App';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FcLike } from "react-icons/fc"
import { FaRegComment } from "react-icons/fa"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {BiLike,BiDislike} from "react-icons/bi"
import {MdDelete} from "react-icons/md"

function Profile() {
    const navigate = useNavigate()
   const userdetails=JSON.parse(localStorage.getItem("userd"))
    const [refresh,setRefresh]=useState(false)
    const [write,setWrite]=useState("")
    const [postid,setPostid]=useState()
    const [commentdata,setCommentdata]=useState([])
    const [commenttoggle,setCommenttoggle]=useState(true)  
    const [toggle,setToggle] = useState(true)
    const [profiledata,setProfiledata]=useState({})
    const [followers,setFollowers]=useState()
    const [following,setFollowing]=useState()
    
    // console.log(state)
   
    // dispatch({type:"USER",payload:localStorage.getItem("userd")})
    const [data, setData] = useState([])
    console.log(data)
    useEffect(() => {
        fetch("http://localhost:5000/mypost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("tok")
            }
        }).then(resp =>
            resp.json())
            .then(res => {
                setFollowers(res.data.followers.length)
                setFollowing(res.data.following.length)
                setData(res.result)
            })

    }, [toggle])
  
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

  function deletpost(id){
      fetch(`http://localhost:5000/deletpost/${id}`,{
        method:"delete",
        headers:{
         "Content-Type":"application/json",
        }
      })
      .then(res=>
        res.json()
      )
      .then(res=>{
        setToggle(!toggle)
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      }
        )
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
        <div className='profile'>
            <div className='userDetail'>
                <div className='userPic'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtVwUoQz0A0BFEsRVq4gLh2KMy4l8RCY8ExP9cXDg4xgr1z1u3RmqLRvNLB-DMPNIuIeM&usqp=CAU" alt="" />
                </div>
                <div className='userAppData'>
                    <h1 className='username'>{userdetails.name}</h1>
                   
                    <h4 className='useremail'>{userdetails.email}</h4>
                    <li>
                        <ul><b>{data.length}</b> Posts</ul>
                        <ul><b>{followers}</b> Followers</ul>
                        <ul><b>{following}</b> Following</ul>
                    </li>
                    {/* < Button style={{position:"relative",bottom:"72px",left:"5px",padding:"8px 40px",fontWeight:"600",fontSize:"1.1em",borderRadius:"10px"}} variant="primary" >
              Follow
            </Button> */}

                </div>
              
            </div>
            <div
                className='userPost'>

{data.map((element)=>{
          return(
            
<Card className='userpost' style={{ boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.5)'}} key={element._id} >
            {/* <Card.Title style={{fontSize:"2em", margin:"10px 10px"}} className='postheading'>{< FaUserCircle/>}<span style={{margin:"10px",position:"relative",top:3}}>{element.title}</span></Card.Title> */}
           
          <Card.Img variant="top" className='cardimage' src={element.photo} />
          
          <Card.Body className='cardbody'>
          <div onClick={()=>{
              deletpost(element._id)
          }} style={{zIndex:"2",position:"absolute",bottom:"84px",right:"5px",fontSize:"2.2em"}}><MdDelete /></div>
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

        </div>
    )
}

export default Profile
