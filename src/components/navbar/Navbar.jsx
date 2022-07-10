import {  HelpOutlined, Logout, Notifications, SearchOutlined, StreetviewTwoTone,  } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import "./navbar.scss" 
import "./koko.css"
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { AuthorizationContext } from '../../context/AuthContext'
import { SearchContext } from '../../context/SearchContext'
import {orglist, Suplist,stafflist} from "./formSearch"
import navImg from "./logo.png"



export default function Navbar() {
  const [querry,setQuerry] = useState("")
  const [org,setOrg] = useState({})
  const [list,setList] = useState()
  const [view,setView] = useState('')
  const {data,dispatch,dataDispatch} = useContext(AuthorizationContext)
  const {insert,searchDispatch} = useContext(SearchContext)
  
  
  
  
  
  const navigate = useNavigate()
  






const listFilter = ()=>{
  if(data){
    if(data.role === 9595){
      setList( orglist)
    }
    else if(data.role === 8585){
      setList( Suplist)
    }
    else if(data.role === 7575){
      setList( stafflist)
    }
  }
}


const VisionRole = ()=>{
  if(data){

    if(data.role === 9595){
      setView('Administrator')
  }else if(data.role === 8585){
    setView('Supervisor')
  }else{
    setView('Staff')
  }
    }
}







  

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };




const logout = async()=>{
  window.localStorage.clear();
  dispatch({type:"LOGOUT"});
  navigate("/")
}



useEffect(()=>{
  listFilter()
  VisionRole()
},[])
  return (
    <div className='dashnavbar'>
        <div className="dashwrapper">

        <div className="dashleft" >
        <Link to="/dashboard" className='link'>
        <img src={navImg} className="navbarLogo" alt="" />
        </Link>
          </div>

          {/* <div className="navPageLinks">
          <Link to="/" className='link'>
            <div className="linkpage">Home</div>
          </Link> */}
          {/* <Link to='/about' className='link'>
            <div className="linkpage">About</div>
          </Link>
          <Link to='/contact' className='link'>
            <div className="linkpage">Contact Us</div>
          </Link>
          </div> */}

            <div className="dashsearch">
              <Box className='dashinputBox'>
              <SearchOutlined  className="icon"/>
              <input type="text" onChange={(e)=>
              {window.location.pathname !== '/dashboard' ?
              searchDispatch({type:'/department',payload:e.target.value})
             : 
             setQuerry(e.target.value)
            }
                } placeholder='Search...' />
              </Box>
                {querry && <div style={{textDecoration:"none",listStyle:"none",display:"flex",flexDirection:"column",gap:"10px",
                backgroundColor:"#11527B",zIndex:222,color:"white",width:"73%",fontSize:"16px",padding:"10px"}}
                 className='querry'>
                   {list.filter((list)=>
                    list.name.toLowerCase().includes(querry)
                    ).map((list)=>(
                  <li  key={list.name}> 
                  <Link to={list.link} onClick={(e)=> setQuerry('')} className='link'>
                 {list.name}
                  </Link>
                  </li>
                ))}</div>}
            </div>


              <Box sx={{display:{xs:"none",sm:"flex"}}}>
            <div className="dashitems">
             
              <div className="item">
                <HelpOutlined className="icon"/>
              </div>
              <div className="item">
                <Notifications className="icon"/>
              </div>
       

              <div className="item">
                 <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
   
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
       
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{display:"block"}}>
        <span style={{fontWeight:"bold"}}>Name{" "}  </span> {data && data.organization_name || data.first_name} <hr />
        </MenuItem>
        <MenuItem sx={{display:"block"}}>
        <span style={{fontWeight:"bold"}}>Email{" "} </span> {data && data.email} <hr />
        </MenuItem>
        <MenuItem sx={{display:"block"}}>
        <span style={{fontWeight:"bold"}}>Role{" "} </span> {data && view} <hr />
        </MenuItem>
        
        <Divider />
       
        
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout  fontSize="small" />
          </ListItemIcon >
          Logout
        </MenuItem>
      </Menu>
               
              </div>

          
            </div>
              </Box>
        </div>
    </div>
  )
}
