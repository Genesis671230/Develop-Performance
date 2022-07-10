import React from 'react'
import { Link } from 'react-router-dom'
import './about.scss'
import CopyrightIcon from '@mui/icons-material/Copyright';
import stat from "./stat.png"
import Footer from '../../components/footer/Footer';
import Topbar from '../../components/topbar/Topbar';


export default function About() {
  return (
    <div className='about'>

        <div className="aboutContainer">
            
        <Topbar/>


            <div className="mainAbout">
              <div className='mainImgDiv'>
              <img className='mainImg' src={stat} alt="" />
              </div>

              <div className="mainText">
                <div className="mainHeader">WELCOME TO PERFORM MANAGER</div>
                <div className="mainPara">An online SaaS performance management system that uses cutting edge technologies tp help bussinesses track and monitor
                the daily, weekly and monthly performance of their staff and also appraise their staff</div>
                <div className="mainPara">We help by usnig machine learning and data analysis to come up with helpful recommendations tailor-made for your arganizations rate and assess their staff's performance and prepare appraisals seamlessly </div>
              </div>
            </div>

             
      

        </div>

    </div>
  )
}
