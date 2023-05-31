import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { addTask, getTask, updateTask, deleteTask } from "../utils/APIRoutes";

const Main = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("ADD");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [TaskId, setTaskId] = useState(undefined);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [list, setList] = useState([]);
  const [flag, setFlag] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("todoList")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("todoList")));
      }
      navigate("/");
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        setUserName(currentUser.username);
        setUserId(currentUser._id);
      }
      if (flag === 0) {
        setFlag(1);
      } else {
        setFlag(0);
      }
      navigate("/");
    }
    fetchData();
  }, [currentUser]);

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDesc(e.target.value);
    }
  };

  const checking = async (id, tit, des, checker) => {
    if (checker === true) {
      checker = false;
    } else {
      checker = true;
    }
    await axios
      .put(`${updateTask}/${id}`, {
        username: userName,
        title: tit,
        desc: des,
        checked: checker,
      })
      .then((response) => {
        console.log("Data updated successfully");
        if (flag === 0) {
          setFlag(1);
        } else {
          setFlag(0);
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const updation = (id, tit, des, checker) => {
    setTitle(tit);
    setDesc(des);
    setAction("UPDATE");
    setTaskId(id);
  };

  const deletion = async (id) => {
    axios
      .delete(`${deleteTask}/${id}`)
      .then((response) => {
        console.log("Data deleted successfully");
        if (flag === 0) {
          setFlag(1);
        } else {
          setFlag(0);
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    if (title.length === 0) {
      toast("Title cannot be empty!", toastOptions);
      return false;
    } else if (desc.length === 0) {
      toast("Description cannot be empty!", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "ADD") {
      if (handleValidation()) {
        const { data } = await axios.post(addTask, {
          username: userName,
          title,
          desc,
        });
        if (data.status === false) {
          toast.error(data.message, toastOptions);
        }
        if (data.status === true) {
          setTitle("");
          setDesc("");
          // localStorage.setItem("todoList", JSON.stringify(data.user));
          if (flag === 0) {
            setFlag(1);
          } else {
            setFlag(0);
          }
          navigate("/");
        }
      }
    } else {
      await axios
        .put(`${updateTask}/${TaskId}`, {
          username: userName,
          title: title,
          desc: desc,
        })
        .then((response) => {
          console.log("Data updated successfully");
          setTitle("");
          setDesc("");
          if (flag === 0) {
            setFlag(1);
          } else {
            setFlag(0);
          }
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };

  useEffect(() => {
    async function fetchList() {
      if (userName) {
        const response = await axios.post(getTask, {
          username: userName,
        });
        setList(response.data);
      }
    }
    fetchList();
  }, [flag]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredList = list.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="main">
        <div className="box">
          <div className="username">{userName}</div>
          <div className="line"></div>
          <div className="lg">
            <Logout></Logout>
          </div>
        </div>
        <div className="input">
          <form autoComplete="off" action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="title">
              <input
                type="text"
                placeholder="Title..."
                name="title"
                value={title}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="desc">
              <textarea
                type="text"
                placeholder="Description..."
                name="desc"
                value={desc}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="sub">
              <button className="submit" type="submit">
                {action}
              </button>
            </div>
          </form>
        </div>

        <h1>Todo List</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="display">
          <div className="lists">
            <table>
              <tbody>
                <tr>
                  <th>Sr No.</th>
                  <th>Check</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {filteredList.map((lst, ind) => {
                  return (
                    <tr key={ind}>
                      <td className="index">{ind + 1}.</td>
                      {lst.checked === false ? (
                        <td className="checker">
                          <div className="checkBox">
                            <input
                              type="checkbox"
                              name={lst._id}
                              onChange={() => {
                                checking(
                                  lst._id,
                                  lst.title,
                                  lst.desc,
                                  lst.checked
                                );
                              }}
                            />
                          </div>
                        </td>
                      ) : (
                        <td className="checker">
                          <div className="checkBox">
                            <input
                              checked
                              type="checkbox"
                              name={lst._id}
                              onChange={() => {
                                checking(
                                  lst._id,
                                  lst.title,
                                  lst.desc,
                                  lst.checked
                                );
                              }}
                            />
                          </div>
                        </td>
                      )}
                      <td className="lstTitle">{lst.title}</td>
                      <td className="lstDesc">{lst.desc}</td>
                      {lst.checked === false ? (
                        <td className="status">
                          <div className="active">Active</div>
                        </td>
                      ) : (
                        <td className="status">
                          <div className="inactive">Completed</div>
                        </td>
                      )}
                      <td className="updel">
                        <button
                          className="update"
                          onClick={() =>
                            updation(lst._id, lst.title, lst.desc, lst.checked)
                          }
                        >
                          Update
                        </button>
                        <button
                          className="delete"
                          onClick={() => deletion(lst._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
