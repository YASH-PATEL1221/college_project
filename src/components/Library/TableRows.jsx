import React from 'react';

import TableRowStyle from "../../css/tablerow/tablerow.module.css";

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

function TableRows({bid,Title,Author,Availability,Update_popup,Price}) {

  const Data = {
    status:true,
    bid:bid,
    Title:Title,
    Author:Author,
    Price:Price,
    Availability:Availability
  }

 
  const SendData = () =>  Update_popup(Data);

  const DeleteData = () => Update_popup({...Data,status:false});


  return (
    <tr className={`${TableRowStyle.row} rows`}>
        <td>{bid}</td>
        <td>{Author}</td>
        <td>{Title}</td>
        <td>{Price}</td>
        <td>{Availability}</td>

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
