import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import './welcome.css';
import "./welcome.scss"
import stat from "./stat.png"
import Pm from "./logo.png"
import tools from './tools.png'
import Footer from '../../components/footer/Footer';
import { AuthorizationContext } from '../../context/AuthContext';


export default function Welcome() {
  const {currentUser} = useContext(AuthorizationContext)
  
  return (
    <div className="welcome">
      <div className="container">

        <div className="welNav">
          <div className="welcomeLogo">
          <Link to={currentUser ? '/dashboard' : '/'} className='link'>
            <img src={Pm} className="welcomeLogo" alt="" />
          </Link>
          </div>
          <div className="pagesRight">
            <div className="pagesLink">Home</div>
            <Link to="/about" className='link'>
              <div className="pagesLink">About</div>
            </Link>
            <Link to='/contact' className='link'>
              <div className="pagesLink">Contact Us</div>
            </Link>
          </div>
        </div>

        <div className="mainContainer">
          <div className="mainInclose">
            <div className="mainLeft">
              <div className="mainHeader">ARE YOU LOOKING FOR A WAY TO TRACK AND MONITOR</div>
              <div className="mainPara">THE DAILY, WEEKLY AND MONTHLY PERFORMANCE OF YOUR STAFF ?</div>
              <div className="mainLink">
                <div >
                  <Link to={currentUser ? '/dashboard' : '/login'} className='link'>
                    <button className="buttonLogin">Login</button>
                  </Link>
                </div>
                <div >
                  <Link to="/signup" className='link'>
                    <button className="buttonSignup">SignUp</button>
                  </Link>
                </div>
              </div>
              <div className="mainExtras">Our Plateform Use Machine learning and data analysis
                to come up with helpful recommendations tailer-made for performance and to improve the way you prepare appraisals seamlessly
              </div>
            </div>
            <div className="mainRight">
              <img src={tools} className="welcomeLogoHome" alt="" />
            </div>
          </div>
        </div>

        <div className="WelMainSec">
          <div className='mainImgDivSec'>
            <img className='mainImgSec' src={stat} alt="" />
          </div>
          <div className="mainTextWelSec">
            <div className="mainHeaderSec">WELCOME TO PERFORM MANAGER</div>
            <div className="mainParaSec">Perform Manager is an online SaaS performance management system that uses cutting edge technologies tp help bussinesses track and moniter
              the daily, weekly and monthly performance of their staff and also appraise their staff</div>
            <div className="mainParaLowerSec">We help usnig machine learning and data analysis to come up with helpful recommendations tailor-made for your arganizations rate and assess their staff's performance and prepare appraisals seamlessly </div>
          </div>
        </div>


        {/* <Footer/> */}


      </div>
    </div>
  );
}
