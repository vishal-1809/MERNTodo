import React from "react";
import '../style.css';
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="logout" title="Logout">
        <button>
          <BiPowerOff className="powerOff" onClick={handleClick} />
        </button>
      </div>
    </>
  );
};

export default Logout;
