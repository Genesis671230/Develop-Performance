import React, { useContext, useEffect, useState } from 'react'
import "./goal.scss"
import { DataGrid } from '@mui/x-data-grid';
import {Link} from "react-router-dom"
import { deleteGoal, getGoal } from '../../services/api';
import { AuthorizationContext } from '../../context/AuthContext';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';


export default function Goal() {
  const [goals,setGoal] = useState([]);
  const {currentUser,data} = useContext(AuthorizationContext)
  const {insert} = useContext(SearchContext)
  

  const filter = ()=> {
    if(insert){
       const res = goals.filter((d)=>{
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
      return goals
    }
  }

  const handleDelete  = async(id) =>{
    await deleteGoal(currentUser,id);
    setGoal(goals.filter( dep => dep._id !== id))

  }
  console.log(goals)

  const goalColumn = [
    {field:'_id', headerName:'ID', width:150 },
    {field:'name', headerName:'Name', width:150},
    {
      field:"description",headerName:"Description", width:370,
  },
    {
      field:"target",headerName:"Target", width:150,
  },
  
    {
      field:"actual_score",headerName:"Actual Score", width:150,
  },
    {
      field:"managers_score",headerName:"Manager Score", width:150,
  },
  {
      field:"createdAt",headerName:"Created At", width:200,
  },

  ]



    const actionColumn = [
        {field:"aciton",headerName:"Action",width:200,renderCell:(params)=>{
            return(
                <div className='cellAction'>
                  <Link to={`/goal/${params.id}`} className='link'  state={params.row} >
                  <BorderColorOutlined  className='viewButton'/>
                  </Link>
                  { data.role !== 7575 && (
                    <DeleteOutlineOutlined 
                    className='deleteButton'
                    onClick={()=>handleDelete(params.id)}/>
                    ) 
                  } 
                </div>
            )
        }}
    ]


    const Goals = async ()=>{
      try{
        const res = await getGoal(currentUser);
          setGoal(res.data)

        }catch(err){
          console.log(err)
        }

      }

      useEffect(()=>{
        Goals()
      },[])


console.log(goals)
  return (
    <div className='datatableGoal'>
      <div className="dataTableTitle">
        Goals
        <Link to="/goal/new" className="link">
          Add New
        </Link>
      </div>
       {goals && 
         <DataGrid
         className='datagrid'
         rows={filter()}
         getRowId={(row) => row._id}
         columns={goalColumn.concat(actionColumn)}
         pageSize={10}
         rowsPerPageOptions={[10]}
         checkboxSelection
         disableSelectionOnClick
         />
        }
    </div>
  )
}
