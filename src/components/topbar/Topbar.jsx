import React, { useContext } from 'react'
import "./topbar.scss"
import Pm from "./logo.png"
import { Link } from 'react-router-dom'
import { AuthorizationContext } from '../../context/AuthContext'

export default function Topbar() {
  const {currentUser} = useContext(AuthorizationContext)

  return (
    <div className="welNavAbout">

    <div className="welcomeLogoNav">
      <Link to={currentUser ? '/dashboard' : '/'} className='link'>
    <img src={Pm} className="welcomeLogo" alt="" />
      </Link>
    </div>
    <div className="pagesRight">
      <Link to="/" className='link'>
    <div className="pagesLink">Home</div>
      </Link>
      <Link to='/about' className='link'>
    <div className="pagesLink">About</div>
      </Link>
    <Link to='/contact' className='link'>
    <div className="pagesLink">Contact Us</div>
    </Link>
    </div>

    </div>
  )
}
