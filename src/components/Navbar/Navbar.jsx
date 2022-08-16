import React,{useState} from 'react';

import NavbarStyle from "../../css/Navbar/Navbar.module.css";

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import IconButton from '@mui/material/IconButton';
// import CropFreeSharpIcon from '@mui/icons-material/CropFreeSharp';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Avatar from '@mui/material/Avatar';

function Navbar({showSidebar}) {
  const [ShowSidebar, setShowSidebar] = useState(true);

  
  const setSidebar = () => setShowSidebar(!ShowSidebar);

  showSidebar(ShowSidebar);

  return (
    <div className={`${NavbarStyle.body}`}>
        <IconButton className={`${NavbarStyle.menu}`} style={{"color":"#fff"}} onClick={setSidebar}>
            <MenuRoundedIcon/>
        </IconButton>
        <IconButton style={{"color":"#fff"}}>
            <NotificationsActiveOutlinedIcon/>
        </IconButton>

        <div style={{"color":"#fff"}} className={`${NavbarStyle.details}`}>
            <p>john smith</p>
            <Avatar className={`${NavbarStyle.avatar}`}/>
        </div>
    </div>
  )
}

export default Navbar;
