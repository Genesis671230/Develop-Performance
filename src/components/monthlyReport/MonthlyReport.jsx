import React, { useContext, useEffect, useState } from 'react'
import "./monthlyReport.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { AuthorizationContext } from '../../context/AuthContext';
import { deletesbu, deleteScore, getMonthlyReport, getSbu, getScore } from '../../services/api';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';


export default function MonthlyReport() {
  const [score, setScore] = useState([]);
  const { currentUser, data } = useContext(AuthorizationContext)
  const { insert } = useContext(SearchContext)
  const [reportData,setReportData] = useState()


  const filter = () => {
    if (insert) {

      const res = score.filter((d) => {
        if (d._id) {
          if (d._id.includes(insert)) {
            console.log("_id,", d)
            return d;
          }
        } if (d.name) {
          if (d.name.toLowerCase().includes(insert)) {
            console.log("Name: ", d)
            return d;
          }
        } if (d.description) {
          if (d.description.toLowerCase().includes(insert)) {
            console.log("description: ", d)
            return d;
          }
        }

      })
      return res
    } else {
      return score
    }
  }







  const handleDelete = async (id) => {
    await deletesbu(currentUser, id);
    setScore(score.filter(dep => dep._id !== id))

  }




  const scoreColumn = [
    { field: '_id', headerName: 'SR', width: 150 },
    { field: 'staff', headerName: 'Staff', width: 150 },
    { field: 'sbu', headerName: 'SBU', width: 150 },
    { field: 'DEC', headerName: 'December', width: 150 },
    { field: 'JAN', headerName: 'January', width: 150 },
    { field: 'FEB', headerName: 'February', width: 150 },
    { field: 'MAR', headerName: 'March', width: 150 },
    { field: 'APR', headerName: 'April', width: 150 },
    { field: 'MAY', headerName: 'May', width: 150 },
    { field: 'JUN', headerName: 'June', width: 150 },
    { field: 'JUL', headerName: 'July', width: 150 },
    { field: 'AUG', headerName: 'August', width: 150 },
    { field: 'SEP', headerName: 'September', width: 150 },
    { field: 'OCT', headerName: 'October', width: 150 },
    { field: 'NOV', headerName: 'November', width: 150 },

   

  ]

 


  const MonthlyRT = async () => {
    try {
      const res = await getMonthlyReport(currentUser)
      setScore(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    MonthlyRT()
  }, [])

  useEffect(() => {
    const run = () => {
      const scr = []
      const res = score.map((item, index) => {
        const obj = {}
        obj["_id"] = index + 1
        obj["staff"] = item._id.staff
        obj["sbu"] = item._id.unit
        const val = item.values
        val.map((v) => {
          obj[v.month] = v.achieved_score
        })
        scr.push(obj)
      })
      setReportData(scr)
    }
    run()

  }, [score])
  

  return (
    <div className='datatableScore'>
      <div className="dataTableTitle">
        MONTHLY COMMUNLATIVE REPORT
        {/* <Link to="/sbu/new" className="link">
          Add New
        </Link> */}
      </div>
      {score &&
      reportData && 
        <DataGrid
          className='datagrid'
          rows={reportData}
          getRowId={(row) => row._id}
          columns={scoreColumn}
          pageSize={20}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      }
    </div>
  )
}
