import React, { useState, useContext } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom"
import { signin } from '../../services/api'
import { AuthorizationContext } from '../../context/AuthContext';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Alert, AlertTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Pm from "./logo.png"
import Footer from '../../components/footer/Footer';



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [role_type, setRole_type] = useState(9595)
  const [open, setOpen] = useState(false);
  const [RespondError, setRespondError] = useState(false);
  const { dispatch, Datadispatch } = useContext(AuthorizationContext)

  const handleRole = (e) => {
    setRole_type(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const setTIme = () => {
    setRespondError(prev => !prev);
    setTimeout(() => {
      setRespondError(prev => !prev)
    }, 5000);
  }

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const resToken = await signin({ email: email, password: password, role_type: role_type });
      const data = resToken.data;
      console.log(data)
      dispatch({ type: "LOGIN", payload: data.token })
      Datadispatch({ type: "USER", payload: data.user })

    } catch (err) {
      return setTIme()
    }
    navigate("/dashboard")
  }
  return (
    <div className="login">
      <div className="top">
        {RespondError &&
          <div className="showError">
            <>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Wrong Credentials — <strong>Please Login with correct Credentials.</strong>
              </Alert>
            </>
          </div>
        }

          <div className="welNavLogin">

          <div className="welcomeLogo">
            <img src={Pm} className="welcomeLogoPm" alt="" />
          </div>
          <div className="pagesRight">
            <Link to="/" className="link">
            <div className="pagesLink" >Home</div>
            </Link>
            <Link to='/about'className='link'>
            <div className="pagesLink">About</div>
            </Link>
            <Link to='/contact' className='link'>
            <div className="pagesLink">Contact Us</div>
            </Link>
          </div>
          </div>

      <div className='loginOuterContainer'>
        <div className="loginContainer">
          <div className="loginTitle">
            <h2>Login</h2>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="formItem">
              <label>Email</label>
              <input
                required
                className="inputItem"
                type="email"
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="formItem">
              <label>Password</label>
              <input
                required
                className="inputItem"
                type="password"
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
              />
            </div>
            <div className="formItem">
              <FormControl className='formInputLogin' sx={{ m: 0, minWidth: 120 }}>
                <label >Role</label>
                <Select
                  labelId="role"
                  id="authority"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={role_type}
                  label="Role"
                  onChange={handleRole}
                >
                  <MenuItem value={9595}>Administrator</MenuItem>
                  <MenuItem value={8585}>Supervisor</MenuItem>
                  <MenuItem value={7575}>Staff</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="formButton">
              <button type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        </div>

        {/* <Footer/> */}


      </div>
    </div>
  );
}
