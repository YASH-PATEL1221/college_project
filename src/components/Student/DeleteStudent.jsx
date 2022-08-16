import PORT from "../../PORT.js"

import React,{useState} from 'react';

import DeleteStudentStyle from "../../css/students/Student.delete.module.css";

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function DeleteStudent({data}) {
  const [ToggleDisplay, setToggleDisplay] = useState(true);

  function displayNone(){
    setToggleDisplay(!ToggleDisplay);
    window.location.reload(true);
  }
  
  return (
    <div className={`${DeleteStudentStyle.body} ${ToggleDisplay ? DeleteStudentStyle.show:DeleteStudentStyle.none}`}>
    <div className={`${DeleteStudentStyle.popup}`}>
      <div className={`${DeleteStudentStyle.header}`}>
          <p>Are you sure?</p>
      </div>
        {console.log(data.id)}
        {/* http://localhost:8000/sms/api/faculty/delete_faculty.php?q=12 */}
      <form action={`http://localhost:${PORT}/sms/api/student/delete_students.php?delete=${data.sid}`} id='form' method="post" className={`${DeleteStudentStyle.form}`}>
          <p className={`${DeleteStudentStyle.data}`}>Name : {data.name}</p><br/>
          <p className={`${DeleteStudentStyle.data}`}>Roll no : {data.roll_no}</p><br/>

          <div className={`${DeleteStudentStyle.buttons}`}>
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

export default DeleteStudent;