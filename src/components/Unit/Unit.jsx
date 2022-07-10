import React, { useContext, useEffect, useState } from 'react'
import "./unit.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { deleteUnit, getUnit } from '../../services/api';
import { AuthorizationContext } from '../../context/AuthContext';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';


export default function Unit() {
  const [unit, setUnit] = useState([]);
  const { currentUser } = useContext(AuthorizationContext)

  const { insert } = useContext(SearchContext)


  const filter = () => {
    if (insert) {
      const res = unit.filter((d) => {
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
      return unit
    }
  }


  const handleDelete = async (id) => {
    await deleteUnit(currentUser, id);
    setUnit(unit.filter(dep => dep._id !== id))

  }


  const unitColumn = [
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
            <Link to={`/unit/${params.id}`} className='link' state={params.row}>
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



  const Unit = async () => {
    try {
      const res = await getUnit(currentUser)
      setUnit(res.data)
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    Unit()
  }, [])




  return (
    <div className='datatableUnit'>
      <div className="dataTableTitle">
        Units
        <Link to="/unit/new" className="link">
          Add New
        </Link>
      </div>
      {unit &&
        <DataGrid
          className='datagrid'
          rows={filter()}
          getRowId={(row) => row._id}
          columns={unitColumn.concat(actionColumn)}
          pageSize={20}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      }
    </div>
  )
}
