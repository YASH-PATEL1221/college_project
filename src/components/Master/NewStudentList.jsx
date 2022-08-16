import React from 'react';

import newStudentStyle from "../../css/newstudent/newstudent.module.css";

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

function NewStudentList({studentname,phone,address,dateofaddmissioin,feesreceipt}) {
  return (
    <>
      <tr className={`${newStudentStyle.row}`}>
        <td>
            <img className={`${newStudentStyle.img}`} src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="" />
        </td>
        <td>
            {studentname}
        </td>
        <td>
            {phone}
        </td>
        <td>
            {address}
        </td>
        <td>
            {dateofaddmissioin}
        </td>
        <td style={{"cursor":"pointer"}}>
            <i style={{"color":"#f96332","fontSize":"20px"}} class="fas fa-file-pdf"></i>   
        </td>
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

export default NewStudentList
