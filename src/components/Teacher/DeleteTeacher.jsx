import PORT from "../../PORT.js"

import React,{useState} from 'react';

import DeleteTeacherStyle from "../../css/teacher/teacherdelete.module.css";


import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function DeleteTeacher({data}) {
  const [ToggleDisplay, setToggleDisplay] = useState(true);

  function displayNone(){
    setToggleDisplay(!ToggleDisplay);
    window.location.reload(true);
  }
  
  return (
    <div className={`${DeleteTeacherStyle.body} ${ToggleDisplay ? DeleteTeacherStyle.show:DeleteTeacherStyle.none}`}>
    <div className={`${DeleteTeacherStyle.popup}`}>
      <div className={`${DeleteTeacherStyle.header}`}>
          <p>Are you sure?</p>
      </div>
        {console.log(data.id)}
        {/* http://localhost:8000/sms/api/faculty/delete_faculty.php?q=12 */}
      <form action={`http://localhost:${PORT}/sms/api/faculty/delete_faculty.php?q=${data.id}`} id='form' method="post" className={`${DeleteTeacherStyle.form}`}>
          <p className={`${DeleteTeacherStyle.data}`}>Name : {data.name}</p><br/>
          <p className={`${DeleteTeacherStyle.data}`}>Degree : {data.degree}</p><br/>
          <p className={`${DeleteTeacherStyle.data}`}>Mobile : {data.mobile}</p><br/>

          <div className={`${DeleteTeacherStyle.buttons}`}>
              <Button color="error" type="submit" onClick={displayNone}>
                  Delete
                  <input type="submit" hidden value="Submit" />
              </Button>
              <Button onClick={displayNone}>
                  Cancle
              </Button>
          </div>
      </form>
    </div>
</div>
  )
}

export default DeleteTeacher;