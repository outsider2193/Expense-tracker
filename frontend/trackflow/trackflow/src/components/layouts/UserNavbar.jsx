import React from 'react'
import { height } from "@mui/system";
import {Button} from "@mui/material"

import hamburgermenu from "../../assets/hamburgermenu.png";
import {  useNavigate } from "react-router-dom";


export const UserNavbar = ({ toggleSidebar }) => {

 const navigate= useNavigate();

  const logout = () => {

  localStorage.clear();
  navigate("/login");

  }
  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link btn btn-light"
              href="#"
              role="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={toggleSidebar}
            >
              <img src={hamburgermenu} style={{ height: "25px", width: "25px" }} alt="Menu" />
            </a>
          </li>
        </ul>
        
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="bi bi-search" />
            </a>
          </li>
          
          <li className="nav-item">
            <a className="nav-link" href="#" data-lte-toggle="fullscreen">
              <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen" />
              <i
                data-lte-icon="minimize"
                className="bi bi-fullscreen-exit"
                style={{ display: "none" }}
              />
            </a>
          </li>
          
          <li className="nav-item">
            <Button 
              variant="contained" 
              color="error"
              onClick={logout}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

