import React,{useEffect,useState} from 'react';

import SidebarStyle from "../../css/sidebar/sidebar.module.css";
import MaincontentStyle from "../../css/maincontent/maincontent.module.css";

import Maincontent from "./Maincontent.jsx";

import Avatar from '@mui/material/Avatar';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import axios from 'axios';

import User from "../GetToken.js"

function Sidebar() {
  
  return (
    <div className={`${SidebarStyle.body}`}>
      <div className={`${SidebarStyle.section1}`}>
        <div className={`${SidebarStyle.img}`}></div>
      </div>
      <div className={`${SidebarStyle.section2}`}>
        <div className={`${SidebarStyle.admin_data}`}>
          <Avatar src='https://www.einfosoft.com/templates/admin/smartangular/source/dark/assets/images/user/admin.jpg' className={`${SidebarStyle.avatar}`}/>
          <p>John smith</p>
          <span>Admin</span>
        </div>
      </div>
      <div className={`${SidebarStyle.section3}`}>

        {/* This is admin dashboard */}
        <Maincontent key={1} list={"Dashboard"} list_items={[
          {list:"Dashboard",link:"/dashboard"},
        ]} Icon={[
        <AutoAwesomeMosaicIcon style={{"color":"#858585","marginLeft":"20px"}}/>,
        <AddIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>,
        <RemoveIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>]}/>

        {/* This is teacher lists */}
        <Maincontent key={2} list={"Teacher"} list_items={[
          {list:"All Teacher",link:"/teachers/list"},
          {list:"Add Teacher",link:"/teachers/add"},

        ]} Icon={[
        <PersonIcon style={{"color":"#858585","marginLeft":"20px"}}/>,
        <AddIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>,
        <RemoveIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>]}/>

        {/* This is Student lists */}
        <Maincontent key={3} list={"Student"} list_items={[
          {list:"All Student",link:"/student/list"},
          {list:"Add Student",link:"/student/add"},

        ]} Icon={[
        <PeopleAltIcon style={{"color":"#858585","marginLeft":"20px"}}/>,
        <AddIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>,
        <RemoveIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>]}/>

        {/* This is courses lists */}
        <Maincontent key={4} list={"Courses"} list_items={[
          {list:"All Courses",link:"/courses/list"},
          {list:"Add Courses",link:"/courses/add"},

        ]} Icon={[
        <SchoolIcon style={{"color":"#858585","marginLeft":"20px"}}/>,
        <AddIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>,
        <RemoveIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>]}/>


        {/* This is fees lists */}
        <Maincontent key={5} list={"Library"} list_items={[
          {list:"All Library",link:"/library/list"},
          {list:"Add Library",link:"/library/add"},

        ]} Icon={[
        <LocalLibraryTwoToneIcon style={{"color":"#858585","marginLeft":"20px"}}/>,
        <AddIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>,
        <RemoveIcon className={`${MaincontentStyle.add_remove}`} style={{"color":"#858585","marginRight":"20px"}}/>]}/>
      </div>
    </div>
  )

 
}

export default Sidebar;