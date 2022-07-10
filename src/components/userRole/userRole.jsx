import React, { useState, useContext, useEffect } from 'react'
import "./userRole.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { deleteUserRole, getUserRole } from '../../services/api';
import { AuthorizationContext } from '../../context/AuthContext';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';

export default function UserRole() {
  const [userRole, setUserRole] = useState([]);
  const { currentUser } = useContext(AuthorizationContext)
  const { insert } = useContext(SearchContext)


  const filter = () => {
    const res = userRole.filter((d) => d.name.toLowerCase().includes(insert))
    return res
  }


  const handleDelete = async (id) => {
    await deleteUserRole(currentUser, id);
    setUserRole(userRole.filter(dep => dep._id !== id))

  }


  const userRoleColumn = [
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
            <Link to={`/userRole/${params.id}`} className='link' state={params.row}>
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


  const userrole = async () => {
    try {
      const res = await getUserRole(currentUser)
      setUserRole(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    userrole()
  }, [])


  return (
    <div className='datatableUR'>
      <div className="dataTableTitle">
        User Role
        <Link to="/userRole/new" className="link">
          Add New
        </Link>
      </div>
      {userRole &&
        <DataGrid
          className='datagrid'
          rows={filter()}
          getRowId={(row) => row._id}
          columns={userRoleColumn.concat(actionColumn)}
          pageSize={20}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      }
    </div>
  )
}
