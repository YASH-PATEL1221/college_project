import React from 'react';

import SportStyle from "../../css/sportachievement/sport.module.css";

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

function SportAchievement({imgUrl,name,coach,date,sportName}) {
  return (
    <>
        <tr className={`${SportStyle.row}`}>
            <td>
                <img className={`${SportStyle.img}`} src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="" />
            </td>
            <td>{name}</td>
            <td className={`${SportStyle.coach}`}>{coach}</td>
            <td>{date}</td>
            <td>{sportName}</td>
            <td>
                <IconButton style={{"color":"#fff"}}>
                    <EditIcon/>
                </IconButton>
                
                <IconButton style={{"color":"#fff"}}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
                
            </td>
        </tr>
    </>
  )
}

export default SportAchievement
