import React from 'react';

import TableRowStyle from "../../../css/tablerow/tablerow.module.css";

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

function TableRows({id,Image,Name, Mobile, Email, Degree, TeachingSubject,Gender,JoiningDate,Update_popup}) {

  const Data = {
    status:true,
    id:id,
    image:Image,
    name:Name,
    mobile:Mobile,
    email:Email,
    degree:Degree,
    teachingsubject:TeachingSubject,
    gender:Gender,
    joiningdate:JoiningDate,
  }

 
  const SendData = () =>  Update_popup(Data);

  const DeleteData = () => Update_popup({...Data,status:false});


  return (
    <tr className={`${TableRowStyle.row} rows`}>
        <td className={`${TableRowStyle.img}`}>
            {Image}
        </td>
        <td>{Name}</td>
        <td>{Mobile}</td>
        <td>{Email}</td>
        <td>{Degree}</td>
        <td>{TeachingSubject}</td>
        <td className={`${TableRowStyle.gender} ${Gender === "male" ? TableRowStyle.male: TableRowStyle.female}`}>
          <p>{Gender}</p>
        </td>
        <td>{JoiningDate}</td>
        <td className={`${TableRowStyle.icons}`}>
          <IconButton onClick={SendData}>
            <EditIcon style={{"color":"#6777ef"}}/>
          </IconButton>
          
          <IconButton name="delete" onClick={DeleteData}>
              <DeleteOutlineOutlinedIcon  style={{"color":"#ff5200"}}/>
          </IconButton>
          
        </td>
    </tr>
  )
}

export default TableRows
