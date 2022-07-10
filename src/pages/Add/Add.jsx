import React, { useState, useContext, useEffect } from 'react';
import './add.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthorizationContext } from "../../context/AuthContext"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./add.scss"
import { getReportTypes, getStaff, getUnit, staffAVL } from '../../services/api';
import { score } from '../../dashArray';

export default function Add({ endpoint, departmentData, title }) {

  const staff = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthorizationContext)
  const [error, setError] = useState(false);
  const [user, setUser] = useState({})
  const [reportPage, setReportPage] = useState(false)
  const [scorePage, setScorePage] = useState(false)
  const [staffPage, setStaffPage] = useState(false)
  const [rt, setRT] = useState();
  const [getSTF, setSTF] = useState()
  const [getUnitData, setUnitData] = useState()
  const [open, setOpen] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [openMon, setOpenMon] = useState(false);
  const [type, setType] = useState(0);
  const [typeStaff, setTypeStaff] = useState(0);
  const [typeunit, setTypeUnit] = useState(0);
  const [typeMon, setTypeMonth] = useState(0);


  const handleSelection = (event) => {
    const eventName = event.target.name
    if (eventName === 'staff') {
      setTypeStaff(event.target.value);
      setUser({ ...user, "staff": event.target.value })
    }
    else if (eventName === 'unit') {
      setTypeUnit(event.target.value);
      setUser({ ...user, "unit": event.target.value })
    }

    else if (eventName === 'month') {
      setTypeMonth(event.target.value);
      setUser({ ...user, "month": event.target.value })
    }

    else if (eventName === 'report_type') {
      setType(event.target.value);
      setUser({ ...user, "report_type": event.target.value })

    }
    else if (eventName === 'role_type') {
      setType(event.target.value);
      setUser({ ...user, "role_type": event.target.value })

    }


  };


  const handleClose = (e) => {
    setOpen(false);
  };

  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleCloseUnit = () => {
    setOpenUnit(false);
  };

  const handleOpenUnit = () => {
    setOpenUnit(true);
  };
  const handleCloseMon = () => {
    setOpenMon(false);
  };

  const handleOpenMon = () => {
    setOpenMon(true);
  };

  const handleInputs = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (staff.pathname === "/staff/new") {
      if (name === "email") {
        const email = e.target.value;
        const avail = await staffAVL(email);
        const res = avail.data
        { res === 'false' ? setError(true) : setError(false) }
      }
      setUser({ ...user, [name]: value })
    } else {
      setUser({ ...user, [name]: value })
      console.log(user)

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(user)
      const res = await endpoint(user, currentUser)

    } catch (err) {
      setError(true)
    }

    setUser({})
    navigate(-1)
  }


  useEffect(() => {
    if (staff.pathname === "/staff/new") {
      setStaffPage(true);
    }
    if (staff.pathname === "/reports/new") {
      setReportPage(true)
      const reportTypes = async () => {
        try {
          const res = await getReportTypes(currentUser)
          setRT(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      reportTypes()
    }

    if (staff.pathname === "/score/new") {
      setScorePage(true)
      const reportTypes = async () => {
        try {
          const resStaff = await getStaff(currentUser)

          setSTF(resStaff.data)

        } catch (err) {
          console.log(err)
        }

      }
      reportTypes()
      const reportTypesUnit = async () => {
        try {
          const resUnit = await getUnit(currentUser)

          setUnitData(resUnit.data)


        } catch (err) {
          console.log(err)
        }
      }
      reportTypesUnit()
    }

  }, [])

  const months = [
    { month: "JAN" },
    { month: "FEB" },
    { month: "MAR" },
    { month: "APR" },
    { month: "MAY" },
    { month: "JUN" },
    { month: "JUL" },
    { month: "AUG" },
    { month: "SEP" },
    { month: "OCT" },
    { month: "NOV" },
    { month: "DEC" },

  ]

  return (
    <div className={staff.pathname !== "/reports/new" ? "add" : "addRepPage"}>
      <div className="logo">
        <img src="logo.png" className="signupLogo" alt="" />
      </div>
      <div className="outerContainer">
        <div className="addContainer">
          <div className="addTitle">{title}</div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              {scorePage ? <>
                <FormControl className='formInputStaff' sx={{ m: 0, minWidth: 120 }}>
                  <label >Staff Name</label>
                  <Select
                    name='staff'
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={typeStaff}
                    required
                    onChange={handleSelection}
                  >
                    <MenuItem key={typeStaff} value={typeStaff} disabled>Please select a Staff</MenuItem>
                    {

                      getSTF ? getSTF.map((item) => {

                        return (<MenuItem key={item._id} value={item.first_name}>{item.first_name}</MenuItem>)
                      }) : null
                    }
                  </Select>
                </FormControl>
                <FormControl className='formInputStaff' sx={{ m: 0, minWidth: 120 }}>
                  <label >Unit Name</label>
                  <Select
                    name="unit"
                    open={openUnit}
                    onClose={handleCloseUnit}
                    onOpen={handleOpenUnit}
                    value={typeunit}
                    required
                    onChange={handleSelection}
                  >
                    <MenuItem key={typeunit} value={typeunit} disabled>Please select a Unit</MenuItem>
                    {

                      getUnitData ? getUnitData.map((item) => {

                        return (<MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>)
                      }) : null
                    }
                  </Select>
                </FormControl>
                <FormControl className='formInputStaff' sx={{ m: 0, minWidth: 120 }}>
                  <label >Month Name</label>
                  <Select
                    name="month"
                    open={openMon}
                    onClose={handleCloseMon}
                    onOpen={handleOpenMon}
                    value={typeMon}
                    required
                    onChange={handleSelection}
                  >
                    <MenuItem key={typeMon} value={typeMon} disabled>Please select Month</MenuItem>
                    {

                      months ? months.map((item) => {

                        return (<MenuItem key={item.month} value={item.month}>{item.month}</MenuItem>)
                      }) : null
                    }
                  </Select>
                </FormControl>
              </>
                : null
              }
              {departmentData.map((input) => (
                <div className="addFormInput" key={input.id}>
                  <label >{input.label}</label>
                  <input
                    id={input.id}
                    name={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInputs} />
                </div>
              ))}

              {staffPage ? <>
                <FormControl className='formInputStaff' sx={{ m: 0, minWidth: 120 }}>
                  <label >Role Types</label>
                  <Select
                    name='role_type'
                    className='formInputStaffSelect'
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={type}
                    required
                    onChange={handleSelection}
                  >
                    <MenuItem value={type} disabled>Select user role</MenuItem>
                    <MenuItem value={8585}>Supervisor</MenuItem>
                    <MenuItem value={7575}>Staff</MenuItem>
                  </Select>
                </FormControl>
              </>
                : null
              }

              {reportPage ? <>

                <FormControl className='formInputReport' sx={{ m: 0, minWidth: 120 }}>
                  <label >Report Types</label>
                  <Select
                    name='report_type'
                    defaultValue={type}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={type}
                    required
                    onChange={handleSelection}
                  >
                    <MenuItem className='disabledSelect' key={type} value={type} disabled>Please select a report type</MenuItem>
                    {
                      rt ? rt.map((item) => {
                        return (<MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>)
                      }) : null
                    }
                  </Select>
                </FormControl>
                <div className='textAreaDiv'>
                  <label>Details</label>
                  <textarea onChange={handleInputs} className='textArea' name="description" id="description" cols="30" rows="10" />
                </div>
              </>
                : null
              }

              <div className="formBtn">
                <button disabled={error} type='submit'>Add</button>
                <div className="error">{error && "Email Already exist"}</div>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
