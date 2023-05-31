import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem('todoList')) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }


  const handleValidation = () => {
    const { username, email, password, confirmPassword } = value;
    if (password !== confirmPassword) {
      toast("Password and Confirm Password should be same!", toastOptions);
      return false;
    }
    else if (username.length < 2) {
      toast("Username should be more than one character!", toastOptions);
      return false;
    }
    else if (email === "") {
      toast("Email should not be empty!", toastOptions);
      return false;
    }
    else if (password.length < 8) {
      toast("Password should contain atleast 8 characters!", toastOptions);
      return false;
    }
    return true;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // console.log("validation");
      const { username, email, password } = value;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("todoList", JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  return (
    <>
      <div className="register">
        <div className="reg">
          <form autocomplete="off" action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="brand">
              {/* <img src='#' alt="logo" /> */}
              <h1>VISHAL</h1>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create User</button>
            <span>
              Already have an account ? <Link to="/login">LOGIN.</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Register;
