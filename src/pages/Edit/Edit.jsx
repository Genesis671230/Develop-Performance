import React,{useState,useContext, useEffect } from 'react';
import './edit.css';
import { useNavigate,useLocation } from 'react-router-dom';
import {AuthorizationContext} from "../../context/AuthContext"
import "./edit.scss"
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getReportTypes, getStaff, getUnit } from '../../services/api';



export default function Edit({endpoint,departmentData,title}) {
  const navigate = useNavigate()
  const location = useLocation()
  const staff = useLocation()
  const {currentUser} = useContext(AuthorizationContext)
  



  const [prop, setProp] = useState({})
  const [error,setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [id,setRoleID] = useState()
  const [staffPage,setStaffPage]  = useState(false)
  const [scorePage, setScorePage] = useState(false)
  const [reportPage,setReportPage]  = useState(false)
  const [openUnit, setOpenUnit] = useState(false);
  const [openMon, setOpenMon] = useState(false);
  const [typeStaff, setTypeStaff] = useState(0);
  const [typeunit, setTypeUnit] = useState(0);
  const [typeMon, setTypeMonth] = useState(0);
  const [getSTF, setSTF] = useState()
  const [getUnitData, setUnitData] = useState()
  const [type,setType] = useState(0);
  const [typeReport,setTypeReport] = useState(0);
  const [rt, setRT] = useState();



  const handleRole = (event) => {
    setProp({...prop,role_type: event.target.value})
    setType(event.target.value);
  };
  const handleReport = (event) => {
    setTypeReport(event.target.value);
  };
  

  useEffect(()=>{
    setProp({ ...prop, "report_type": typeReport })
  },[typeReport])
  console.log(prop)



  const handleSelection = (event) => {
    const eventName = event.target.name
    if (eventName === 'staff') {
      setTypeStaff(event.target.value);
      setProp({ ...prop, "staff": event.target.value })
    }
    else if (eventName === 'unit') {
      setTypeUnit(event.target.value);
      setProp({ ...prop, "unit": event.target.value })
    }
    
    else if (eventName === 'month') {
      setTypeMonth(event.target.value);
      setProp({ ...prop, "month": event.target.value })
    }

  };



  const handleClose = (e) => {
    setOpen(false);
  };

  const handleOpen = () => {
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
  
  const handleInputs = (e) =>{
    const  name = e.target.name;
    const value = e.target.value;
    setProp({...prop,[name]: value})
  }


   
      const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          const res = await endpoint(prop._id,prop,currentUser)
        }catch(err){
          setError(true)
        }
        navigate(-1)
        }
        
        const  handlePlace = (label)=>{
          for(const [key,value] of Object.entries(prop)){
            if(key === label) {
              return value;
            }
          }
          }
                  
      useEffect(()=>{
        const res = location.state;
        setProp(res);
        if(res.role_type === 'Staff'){
          setType(7575)
        }else{
          setType(8585)
        }
        
        if(res.report_type !== undefined){
          setTypeReport(res.report_type)
        }

      },[])

    

      useEffect(()=>{
        const res = staff.pathname.split("/")
        
        const id = res[2];
        setRoleID(id)
        const resStaff = res[1];

        if(resStaff === "staff"){
          setStaffPage(true)
         
        }
        if(resStaff === "reports"){
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

        if (resStaff === "score") {
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



         
      },[])
console.log(prop)

  return (
    <div className={reportPage ? "editReportpage" : "editpage"} >
       <div className="editlogo">
        <img src="logo.png" className="signupLogo" alt="" />
      </div> 

      <div className="outerContainer">
        
      <div className="editContainerForm">
        <div className="edittitle">{title}</div>
        
        <div className="editRightMain">
            {prop && 
              <form  className='EDTForm' onSubmit={handleSubmit}>
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
                    <MenuItem key={typeStaff} value={typeStaff} disabled>{prop.staff}</MenuItem>
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
                    <MenuItem key={typeunit} value={typeunit} disabled>{prop.unit}</MenuItem>
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
                    <MenuItem key={prop.month} value={typeMon} disabled>{prop.month}</MenuItem>
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
                  
                  {departmentData.map((input)=>(
                    <div className="editformRight" key={input.id}>
                      <label >{input.label}</label>
                      <input
                        id={input.id} 
                        name={input.id}
                        type={input.label} 
                        defaultValue={handlePlace(input.id)}
                        placeholder="" 
                        onChange={handleInputs}/>
                    </div>

                  ))}

                       
            {staffPage ? <>
    
                    <FormControl className='formInput' sx={{ m: 0, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
                <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={type}
                // defaultValue={handlePlace("role_type")}
                required
                label="Role"
                onChange={handleRole}
                >

                <MenuItem value={0}>Select user role</MenuItem>
                <MenuItem value={8585}>Supervisor</MenuItem>
                <MenuItem value={7575}>Staff</MenuItem>
                </Select>
                </FormControl>


                </>
                : null
                }

                {reportPage ? <>

                  <FormControl className='formInputEditReport' sx={{ m: 0, minWidth: 120 }}>
                  <label >Report Types</label>
                    <Select
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={typeReport}
                      required
                      label="Report Type"
                      onSelect={(e) => console.log("on", e)}
                      onChange={handleReport}
                      >
                      <MenuItem value={typeReport} disabled>Please select a report type</MenuItem>
                      {
    
                        rt ? rt.map((item) => {
                          return (<MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>)
                        }) : null
                      }
                    </Select>
                  </FormControl>
                  <div className='textAreaDivRep'>
                  <label>Details</label>
                    <textarea className='textArea' onChange={handleInputs} defaultValue={prop.description} name="description" id="description" cols="30" rows="10"/>
                  </div>
                </>
                  : null
                }
                            
                <div className="editformBTN">
                <button  type='submit'>Edit</button>
                </div>
            </form>
            }

        </div>
   
      </div>
                </div>
    </div>
  );
}
