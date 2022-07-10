import React, { useContext, useEffect, useState } from 'react'
import "./task.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { deleteTask, getTask } from '../../services/api';
import { AuthorizationContext } from '../../context/AuthContext';
import { BorderColorOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { SearchContext } from '../../context/SearchContext';


export default function Task() {
  const [task, setTask] = useState([]);
  const { currentUser, data } = useContext(AuthorizationContext)

  const { insert } = useContext(SearchContext)


  const filter = () => {
    if (insert) {
      const res = task.filter((d) => {
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
      return task
    }
  }

  const handleDelete = async (id) => {
    await deleteTask(currentUser, id);
    setTask(task.filter(dep => dep._id !== id))

  }

  const taskColumn = [
    { field: '_id', headerName: 'ID', width: 140 },
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
            <Link to={`/task/${params.id}`} className='link' state={params.row}>
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

  const Task = async () => {
    try {
      const res = await getTask(currentUser)
      setTask(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    Task()
  }, [])

  return (
    <div className='datatableTask'>
      <div className="dataTableTitle">
        Task
        <Link to="/task/new" className="link">
          Add New
        </Link>
      </div>
      {task &&
        <DataGrid
          className='datagrid'
          rows={filter()}
          columns={taskColumn.concat(actionColumn)}
          getRowId={(row) => row._id}
          pageSize={20}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      }
    </div>
  )
}
