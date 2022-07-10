import React, { useContext, useEffect, useState } from 'react'
import "./staff.scss"
import { DataGrid } from '@mui/x-data-grid';
import {Link} from "react-router-dom"
import { getStaff,deleteStaff } from '../../services/api';
import { AuthorizationContext } from '../../context/AuthContext';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';


export default function Staff() {
  const [staff,setStaff] = useState([]);
  const {currentUser} = useContext(AuthorizationContext)

  const {insert} = useContext(SearchContext)
  
  
  const filter = ()=> {
    if(insert){
       const res = staff.filter((d)=>{
        if(d._id){
          if(d._id.includes(insert)){
            console.log("_id,",d)
            return d;
          }
        } if(d.name)
        {
          if(d.name.toLowerCase().includes(insert)){
            console.log("Name: ",d)
            return d;
          }
        } if(d.description)
        {
          if(d.description.toLowerCase().includes(insert)){
            console.log("description: ",d)
            return d;
          }
        }
        
      })
      return res   
    }else{
      return staff
    }
  }

  const handleDelete  = async(id) =>{
    await deleteStaff(currentUser,id);
    setStaff(staff.filter( dep => dep._id !== id))

  }


          const staffColumn = [
            {field:'_id', headerName:'ID', width:150},
            {field:'first_name', headerName:'First Name', width:150},
            {field:'last_name', headerName:'Last Name', width:150},
            {field:'email', headerName:'Email', width:250},
            {field:'role_type', headerName:'Role', width:150},
            
          ]

          
            const actionColumn = [
                {field:"aciton",headerName:"Action",width:200,renderCell:(params)=>{
                    return(
                        <div className='cellAction'>
                          <Link to={`/staff/${params.id}`} className='link'  state={params.row}>
                          <BorderColorOutlined  className='viewButton'/>
                          </Link>
                          <DeleteOutlineOutlined 
                          className='deleteButton'
                          onClick={()=>handleDelete(params.id)}/>
                        </div>
                    )
                }}
            ]


        const Staff = async ()=>{
          try{
            const res = await getStaff(currentUser)
            setStaff(res.data)          
          }catch(err){
            console.log(err)
          }
          }



      useEffect(()=>{
        Staff()
      },[])

  return (
    <div className='datatableStaff'>
      <div className="dataTableTitle">
        Staff
        <Link to="/staff/new" className="link">
          Add New
        </Link>
      </div>
      {staff &&
         <DataGrid
         className='datagrid'
        rows={filter()}
        getRowId={(row)=>row._id}
        columns={staffColumn.concat(actionColumn)}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
        }
    </div>
  )
}
