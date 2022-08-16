import React,{useState,useEffect} from 'react';

import DashboardStyle from "../../css/dashboard/dashboard.module.css"

import Navbar from "../Navbar/Navbar.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import axios from 'axios';
import cookie from "../Cookie.js"


function Dashboard(props) {

  const [Show, setShow] = useState(true);

  const showSidebar = state => setShow(state);
    
 
  return (
    <div className={`${DashboardStyle.body}`}>
      <div className={`${DashboardStyle.sidebar}`} style={Show ? {"width":"260px"}:{"width":"0"}}>
        <Sidebar/>
      </div>
      <div className={`${DashboardStyle.main}`}>
        <Navbar showSidebar={showSidebar}/>
        {props.page}
      </div>
    </div>
  )
}

export default Dashboard;