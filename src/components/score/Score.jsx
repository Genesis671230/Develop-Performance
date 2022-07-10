import React, { useContext, useEffect, useState } from 'react'
import "./score.scss"
import { DataGrid } from '@mui/x-data-grid';
import {Link} from "react-router-dom"
import { AuthorizationContext } from '../../context/AuthContext';
import { deleteScore, getScore } from '../../services/api';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';


export default function Score() {
  const [score,setScore] = useState([]);
  const {currentUser,data} = useContext(AuthorizationContext)
  const {insert} = useContext(SearchContext)
  console.log(score)
  

  const filter = ()=> {
    if(insert){
       const res = score.filter((d)=>{
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
      return score
    }
  }
  

  const handleDelete  = async(id) =>{
    await deleteScore(currentUser,id);
    setScore(score.filter( dep => dep._id !== id))

  }



  
                const scoreColumn = [
                  {field:'_id', headerName:'ID', width:150},
                  {field:'staff', headerName:'Staff Name', width:150},
                  {field:'unit', headerName:'Unit', width:150},
                  {field:'month', headerName:'Month', width:150},
                  {field:'week', headerName:'Week', width:150},
                  {field:'target', headerName:'Target', width:150},
                  {field:'timeLine_for_completion', headerName:'Timeline for completion', width:150},
                  {field:'achievement_status', headerName:'Status', width:150},
                  {field:'suggestionsORchallenges', headerName:'Suggestions/Chanllenges', width:150},
                  {field:'overall_score', headerName:'Overall Score', width:150},
                  {field:'personal_score', headerName:'Personal Score', width:150},
                  {field:'achieved_score', headerName:'Achieved Score', width:150},
                {
                    field:"createdAt",headerName:"Created At", width:200,
                },

                ]

                  const actionColumn = [
                      {field:"aciton",headerName:"Action",width:200,renderCell:(params)=>{
                          return(
                              <div className='cellAction'>
                                <Link to={`/score/${params.id}`} className='link'  state={params.row}>
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


          const Score = async ()=>{
            try{
              const res = await getScore(currentUser)
              setScore(res.data)          
            }catch(err){
              console.log(err)
            }}



      useEffect(()=>{
        Score()
      },[])


  return (
    <div className='datatableScore'>
      <div className="dataTableTitle">
        Score
        <Link to="/score/new" className="link">
          Add New
        </Link>
      </div>
      {score && 
         <DataGrid
         className='datagrid'
         rows={filter()}
        getRowId={(row) => row._id}
        columns={scoreColumn.concat(actionColumn)}
        pageSize={20}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
        }
    </div>
  )
}
