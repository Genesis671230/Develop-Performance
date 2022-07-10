import React, { useContext, useEffect, useState } from 'react'
import "./department.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { AuthorizationContext } from "../../context/AuthContext"
import { deleteDepartment, getDepartment } from '../../services/api';
import { DeleteOutlineOutlined, BorderColorOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';

export default function Department() {
  const [dep, setDep] = useState([])
  const { currentUser } = useContext(AuthorizationContext)
  const { insert } = useContext(SearchContext)

  const filter = () => {
    if (insert) {
      const res = dep.filter((d) => {
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
      return dep
    }
  }



  console.log(insert)

  const handleDelete = async (id) => {
    await deleteDepartment(currentUser, id);
    setDep(dep.filter(dep => dep._id !== id))
  }


  const depColumn = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Department Name', width: 180 },
    {
      field: "description", headerName: "Description", width: 370,
    },
    {
      field: "createdAt", headerName: "Created At", width: 200,
    }
  ]

  const actionColumn = [
    {
      field: "action", headerName: "Action", width: 200, renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to={`/department/${params.id}`} className='link' state={params.row}>
              <BorderColorOutlined className='viewButton' />
            </Link>
            <DeleteOutlineOutlined
              className='deleteButton'
              onClick={() => handleDelete(params.id)} />
          </div>
        )
      }
    }
  ]


  const Departments = async () => {
    try {
      const res = await getDepartment(currentUser);
      if (res) {
        setDep(res.data)
      }

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    Departments()
  }, [])


  return (
    <div className='datatableDep'>
      <div className="dataTableTitle">

        Departments

        <Link to="/department/new" className="link">
          Add New
        </Link>
      </div>
      {dep &&
        <DataGrid
          className='datagrid'
          rows={filter()}
          getRowId={(row) => row._id}
          columns={depColumn.concat(actionColumn)}
          pageSize={20}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      }
    </div>
  )
}

