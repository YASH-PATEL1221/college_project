import React from 'react';

import teacherListStyle from "../../css/teacherlist/tracherlist.module.css";


function TeacherList({imgUrl,name,status}) {
  return (
    <>
      <tr className={`${teacherListStyle.row}`}>
        <td>
            <img className={`${teacherListStyle.img}`} src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="" />
        </td>
        <td>
          {name}
        </td>
        <td>
          <div className={`${teacherListStyle.Badge} ${status === "Available" ? `${teacherListStyle.success}`:`${teacherListStyle.danger}`}`}>{status}</div>
        </td>
      </tr>
    </>
  )
}

export default TeacherList;
