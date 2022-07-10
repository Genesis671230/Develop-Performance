import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./contact.scss";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Footer from "../../components/footer/Footer";
import Topbar from "../../components/topbar/Topbar";
import CL from "./logo.png";
import { AuthorizationContext } from "../../context/AuthContext";
import { contactObjects } from "../../formSource";
import axios from "axios";
import { CONTACT_API_URL } from "../../services/api";

export default function Contact() {
  const { currentUser } = useContext(AuthorizationContext);
  const [setError] = useState(false);
  const [contactMessage, setContactMessage] = useState({
    entered_fullname: "",
    entered_message: "",
    email: "",
    entered_subject: "",
    origin: "Perform Manager website Contact",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

// console.log("before>>>>>>>>>>");
    // console.log(contactMessage);
    // console.log("after>>>>>>>>>>");
    try {
      const response = await axios.post(CONTACT_API_URL, contactMessage);
      const data = response.data;
      // console.log("data", data);
      const status = data.status;
      // console.log("status", status);
      // const message = data.message;
      // console.log("message", message);

      if (status === 1) {
        // console.log("Successful");
        alert("Message Sent Successfully");
      } else {
        alert("An Error Occurred");
      }
    } catch (error) {
      // console.log(error.message);
      if (error.message === "Request failed with status code 400") {
        alert("An Error Occurred");
      } else {
        alert("This Unknown Error Occurred");
      }
    }
    setContactMessage({
      entered_fullname: "",
      email: "",
      entered_message: "",
      entered_subject: "",
      origin: "Perform Manager website",
    });
    // navigate("/login");
  };
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContactMessage({ ...contactMessage, [name]: value });
  };

  return (
    <div className="contact">
      <div className="contactContainer">
        <div className="contactnavbar">
          <div className="navContact">
            <div className="navLeft">
              <Link to={currentUser ? "/dashboard" : "/"} className="link">
                <img src={CL} className="welcomeLogo" alt="" />
              </Link>
            </div>
            <div className="navRight">
              <Link to="/" className="link">
                <div className="link">Home</div>
              </Link>
              <Link to="/about" className="link">
                <div className="link">About</div>
              </Link>

              <div className="link">Contact Us</div>
            </div>
          </div>
        </div>
        <div className="contactContainer">
          <div className="addTitle">
          
                    <div className="leftSide">
                    <h2>Contact us
                      </h2>
                      We’d love to hear from you! Get in touch with the right people at the PerformMan.


            <form onSubmit={handleSubmit}>
              {contactObjects.map((input) => (
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
                <button className="sb">Submit</button>
              </div>
            </form>
          </div>
          </div>


        </div>
      </div>
    </div>
  );
}
