import React from 'react';

import TableRowStyle from "../../css/tablerow/tablerow.module.css";

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

function TableRows({cid,sid,Image,Name,dob, Mobile, Email,address, Degree, admission_date,Gender,roll_no,Update_popup}) {

  const Data = {
    status:true,
    cid:cid,
    sid:sid,
    image:Image,
    name:Name,
    mobile:Mobile,
    email:Email,
    degree:Degree,
    gender:Gender,
    dob:dob,
    address:address,
    admission_date:admission_date,
    roll_no:roll_no,
  }

 
  const SendData = () =>  Update_popup(Data);

  const DeleteData = () => Update_popup({...Data,status:false});


  return (
    <tr className={`${TableRowStyle.row} rows`}>
        <td className={`${TableRowStyle.img}`}>
            {Image}
        </td>
        <td>{roll_no}</td>
        <td>{Name}</td>
        <td>{Mobile}</td>
        <td>{Email}</td>
        <td>{admission_date}</td>
        <td className={`${TableRowStyle.gender} ${Gender === "male" ? TableRowStyle.male: TableRowStyle.female}`}>
          <p>{Gender}</p>
        </td>
        <td>{dob}</td>
        <td>{address}</td>
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
