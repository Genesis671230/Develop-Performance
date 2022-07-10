import React, { useContext, useEffect, useState } from 'react'
import "./report.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { deleteReport, getReport } from '../../services/api';
import { AuthorizationContext } from '../../context/AuthContext';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';


export default function Report() {
  const [report, setReport] = useState([]);
  const { currentUser, data } = useContext(AuthorizationContext)
  const { insert } = useContext(SearchContext)

  const filter = () => {
    if (insert) {
      const res = report.filter((d) => {
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
      return report
    }
  }


  const handleDelete = async (id) => {
    await deleteReport(currentUser, id);
    setReport(report.filter(dep => dep._id !== id))

  }

  const reportColumn = [
    { field: '_id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'activity', headerName: 'Activity', width: 150 },
    { field: 'report_type', headerName: 'Report Types', width: 150 },
    { field: 'timeline', headerName: 'Timeline', width: 100 },
    { field: 'no_of_people', headerName: 'No of People', width: 130 },
    { field: 'no_of_areas', headerName: 'Areas', width: 100 },
    { field: 'no_of_countries', headerName: 'Countries', width: 100 },
    { field: 'no_of_languages', headerName: 'Languages', width: 130 },
    { field: 'no_of_materials_sold', headerName: 'Materials Sold', width: 120 },
    { field: 'no_of_testimonies', headerName: 'No of Testimonies', width: 150 },
    {
      field: "description", headerName: "Description", width: 370,
    },
    {
      field: "createdAt", headerName: "Created At", width: 200,
    },

  ]

console.log(report)

  const actionColumn = [
    {
      field: "aciton", headerName: "Action", width: 200, renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to={`/reports/${params.id}`} className='link' state={params.row}>
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

  const Report = async () => {
    try {
      const res = await getReport(currentUser)
      setReport(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    Report()
  }, [])



  return (
    <div className='datatableRep'>
      <div className="dataTableTitle">
        Reports
        <Link to="/reports/new" className="link">
          Add New
        </Link>
      </div>
      {report &&
        <DataGrid
          className='datagrid'
          rows={filter()}
          getRowId={(row) => row._id}
          columns={reportColumn.concat(actionColumn)}
          pageSize={20}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      }
    </div>
  )
}
