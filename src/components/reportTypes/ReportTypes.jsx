import React, { useContext, useEffect, useState } from 'react'
import "./reportTypes.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { AuthorizationContext } from '../../context/AuthContext';
import { deleteReportTypes, getReportTypes } from '../../services/api';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';


export default function ReportTypes() {
  const [score, setScore] = useState([]);
  const { currentUser, data } = useContext(AuthorizationContext)
  const { insert } = useContext(SearchContext)



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
    await deleteReportTypes(currentUser, id);
    setScore(score.filter(dep => dep._id !== id))

  }




  const scoreColumn = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: "description", headerName: "Description", width: 370,
    },
    {
      field: "createdAt", headerName: "Created At", width: 200,
    },

  ]

  const actionColumn = [
    {
      field: "aciton", headerName: "Action", width: 200, renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to={`/reportTypes/${params.id}`} className='link' state={params.row}>
              <BorderColorOutlined className='viewButton' />
            </Link>
            {data.role !== 7575 && (
              <DeleteOutlineOutlined
                className='deleteButton'
                onClick={() => handleDelete(params.id)} />
            )
            }
          </div>
        )
      }
    }
  ]


  const Score = async () => {
    try {
      const res = await getReportTypes(currentUser)
      setScore(res.data)
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    Score()
  }, [])


  return (
    <div className='datatableScore'>
      <div className="dataTableTitle">
        Report Types
        <Link to="/reportTypes/new" className="link">
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
