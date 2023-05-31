import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
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
    const { username, password } = value;
    if (username === "") {
      toast("Username is required!", toastOptions);
      return false;
    }
    else if (password === "") {
      toast("Password is required!", toastOptions);
      return false;
    }
    return true;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // console.log("validation");
      const { username, password } = value;
      const { data } = await axios.post(loginRoute, {
        username,
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
      <div className="login">
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
              min="2"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">LOGIN</button>
            <span>
              Don't have an account ? <Link to="/register">REGISTER.</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
