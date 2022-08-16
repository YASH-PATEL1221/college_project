import PORT from "../../PORT.js"

import React,{useState} from 'react';

import DeleteBookstyle from "../../css/Books/books.delete.module.css";

import Button from '@mui/material/Button';

function DeleteLibrary({data}) {
  const [ToggleDisplay, setToggleDisplay] = useState(true);

  function displayNone(){
    setToggleDisplay(!ToggleDisplay);
    window.location.reload(true);
  }
  
  return (
    <div className={`${DeleteBookstyle.body} ${ToggleDisplay ? DeleteBookstyle.show:DeleteBookstyle.none}`}>
    <div className={`${DeleteBookstyle.popup}`}>
      <div className={`${DeleteBookstyle.header}`}>
          <p>Are you sure?</p>
      </div>
        {console.log(data.id)}
        {/* http://localhost:8000/sms/api/faculty/delete_faculty.php?q=12 */}
      <form action={`http://localhost:${PORT}/sms/api/library/delete_books.php?q=${data.bid}`} id='form' method="post" className={`${DeleteBookstyle.form}`}>
          <p className={`${DeleteBookstyle.data}`}>Name : {data.bid}</p><br/>
          <p className={`${DeleteBookstyle.data}`}>Roll no : {data.Title}</p><br/>

          <div className={`${DeleteBookstyle.buttons}`}>
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

export default DeleteLibrary;