import React, { useState, useContext } from "react";
import "./signup.css";
import Pm from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../../context/AuthContext";
import { signup } from "../../services/api";
import { DriveFolderUploadOutlined, Copyright } from "@mui/icons-material";
import "./signup.scss";
import Footer from "../../components/footer/Footer";
export default function Signup({ userInputs }) {
  const { currentUser } = useContext(AuthorizationContext);

  const [setError] = useState(false);
  const [file, setFile] = useState("");

  const [user, setUser] = useState({
    organization_name: "",
    organization_reg_no: "",
    email: "",
    password: "",
    industry: "",
    annual_revenue_range: "",
    date_of_business_commencement: "",
    organization_size: "",
    states: "",
    country: "",
    city: "",
    address: "",
  });

  const { dispatch } = useContext(AuthorizationContext);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resToken = await signup(user);
      const tok = resToken;
      console.log(resToken);
      dispatch({ type: "SIGNUP", payload: tok });
    } catch (err) {
      setError(true);
    }

    setUser({
      organization_name: "",
      organization_reg_no: "",
      email: "",
      password: "",
      industry: "",
      annual_revenue_range: "",
      date_of_business_commencement: "",
      organization_size: "",
      states: "",
      country: "",
      city: "",
      address: "",
    });
    navigate("/login");
  };

  console.log(user);

  return (
    <div className="signupPage">
      <div className="topSignup">
        <div className="welNavSignup">
          <div className="welcomeLogo">
            <Link to={currentUser ? "/dashboard" : "/login"} className="link">
              <img src={Pm} className="welcomeLogo" alt="" />
            </Link>
          </div>
          <div className="pagesRight">
            <Link to="/" className="link">
              <div className="pagesLink">Home</div>
            </Link>
            <div className="pagesLink">About</div>
            <div className="pagesLink">Contact Us</div>
          </div>
        </div>

        <div className="title">
          <div className="ttext">Let's activate your account</div>
        </div>
        <div className="signupOuterContainer"> 
        <div className="signupContainer">
          <div className="rightSideSignup">
            <form onSubmit={handleSubmit}>
              {userInputs.map((input) => (
                <div className="signupformInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    name={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInputs}
                  />
                </div>
              ))}
              <div className="signuptn">
                <button className="sb">Signup</button>
              </div>
              <div className="trialBtn">
                  3 Day Trial Period
             
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
