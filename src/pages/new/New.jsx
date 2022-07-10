import { DriveFolderUploadOutlined } from '@mui/icons-material'
import React, { useState } from 'react'

import "./new.scss"
export default function New({inputs,title}) {


  const [file,setFile] = useState("");
    console.log(file);








  return (
    <div className='new'>

      <div className="newContainer">
   



        <div className="top">
          <h1>{title}</h1>
        </div>



        <div className="bottom">
          {file &&
            <div className="left">
                <img src={file ? URL.createObjectURL(file) : ""}
                 alt="" />
            </div>
                }


          <div className="right">

            <form >
                <div className="formInput">
                  <label htmlFor='file' >Image: <DriveFolderUploadOutlined className='icon'/></label>
                  <input type="file" onChange={e=>setFile(e.target.files[0])} id='file' style={{display:"none"}}/>
                </div>
                {inputs.map((input)=>(
                  <div className="formInput" key={input.id}>
                    <label >{input.label}</label>
                    <input type={input.label} placeholder={input.placeholder}/>
                  </div>

                ))}
              


            <button>Add</button>
          </form>

          </div>

        </div>

      </div>
    </div>
  )
}
