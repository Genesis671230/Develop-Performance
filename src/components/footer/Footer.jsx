import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';
import './footer.scss'

export default function Footer() {
  return (
    
          <div className="wellFooter">          
           <div className='footerContent'>
            <CopyrightIcon/>
            2022 PerformManager. All reserved
            </div> 
           <div className='footerContent'>
            <CopyrightIcon/>
             All Rights Reserved | <span className='footerPrivacy'>Terms and Conditions | Privacy Policy</span>
            </div> 
      </div>
    
  )
}
