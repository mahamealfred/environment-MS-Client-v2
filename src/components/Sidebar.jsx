import React from "react";
import { IoStatsChartSharp } from "react-icons/io5";
import { HiMusicNote } from "react-icons/hi";
import { FiUsers, FiSettings } from "react-icons/fi";
import { SiDatacamp, Si1001Tracklists } from "react-icons/si";
import Logo from "../assets/logo.png";
import Player from "./Player";
import Button from "./Home/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const {logout,userInfo}=useAuth()
  const navigate=useNavigate()
  const handleLogout=()=>{
    logout()
    navigate("/")
  }

  return (
    <div className="sidebar">
      <div className="upper__container">
        <div className="brand">
          <img src={Logo} alt="EMS" />
        </div>
        <div className="links">
          <ul>
            {
              JSON.parse(userInfo).role ==="Admin"?(

                <>
                 <li className="active">
              <IoStatsChartSharp />
              <a href="/dashboard">Overview</a>
            </li>
            <li>
              <SiDatacamp />
              <a href="/dashboard/complaint-categories">Category</a>
            </li>
            <li>
            <SiDatacamp />
              <a href="/dashboard/complaints">Complaints</a>
            </li>
            <li>
            <SiDatacamp />
              <a href="#">Aproved Complaints</a>
            </li>
            <li>
              <FiUsers />
              <a href="/dashboard/users">Users</a>
            </li>
                </>
              ):(
                <>
                  <li className="active">
              <IoStatsChartSharp />
              <a href="/dashboard">Overview</a>
            </li>
      
            <li>
              <HiMusicNote />
              <a href="#">Pending Complaints</a>
            </li>
                </>
              )
            }
          
            <li>
              <FiSettings />
              <a>
              <Button blue text="Logout"  onClick={handleLogout}/>
              </a>
            
            </li>
          </ul>
        </div>
      </div>
      <div className="lower__container">
        <div className="music__container">
          <Player />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
