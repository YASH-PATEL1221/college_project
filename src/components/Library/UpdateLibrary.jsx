import PORT from "../../PORT.js"

import React,{useState,useReducer} from 'react';

import LibraryUpdateStyle from "../../css/Books/Library.update.module.css";  

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function reducer(state,action){
  console.log([action.input],action.value);
  return {...state,[action.input]:action.value}
}


function UpdateTeacher({data}) {
  const [ToggleDisplay, setToggleDisplay] = useState(true);

  function displayNone(){
    setToggleDisplay(!ToggleDisplay);
    window.location.reload(true);
  }


  const InitialState = {
    bid:data.bid,
    Title:data.Title,
    Author:data.Author,
    Price:data.Price,
    Availability:data.Availability,
  }

  
  const [FormData,dispatch] = useReducer(reducer,InitialState);

  function OnChange(e){
    const action = {
      input:e.target.name,
      value:e.target.value
    }
    dispatch(action);
  }

  
  return (
    <div className={`${LibraryUpdateStyle.body} ${ToggleDisplay ? LibraryUpdateStyle.show:LibraryUpdateStyle.none}`}>
        <div className={`${LibraryUpdateStyle.popup}`}>
          <div className={`${LibraryUpdateStyle.header}`}>
            <div className={`${LibraryUpdateStyle.left}`}>
              <span>{data.image}</span>
              <p>{data.name}</p>
            </div>
            <div className={`${LibraryUpdateStyle.right}`}>
              <IconButton onClick={displayNone}>
                <CloseIcon className={`${LibraryUpdateStyle.close}`}/>
              </IconButton>
            </div>
          </div>

          <form action={`http://localhost:${PORT}/sms/api/Library/update_Librarys.php`} id='form' method="post" className={`${LibraryUpdateStyle.form}`}>
            <input type="text" hidden name="sid" onChange={OnChange} value={`${FormData.bid}`} id="" />
            <div>
              <input type="text" onChange={OnChange} className={`${LibraryUpdateStyle.input}`} value={`${FormData.Title}`} name="Library_name"/>
            </div>

            {/* <div className={`${LibraryUpdateStyle.row1}`}>
              <input type="text" onChange={OnChange} className={`${LibraryUpdateStyle.input}`} value={`${FormData.Library_name}`} name="phone_no" id="" />
              <input type="email" onChange={OnChange} className={`${LibraryUpdateStyle.input}`} value={`${FormData.Title}`} name="email" id="" />
            </div> */}

            <div className={`${LibraryUpdateStyle.row1}`}>
              <input type="text" onChange={OnChange} className={`${LibraryUpdateStyle.input}`} value={`${FormData.Price}`} name="courseid"/>
              <input type="text" onChange={OnChange} className={`${LibraryUpdateStyle.input}`} value={`${FormData.Availability}`} name="roll_no" id="" />
            </div>

            <div className={`${LibraryUpdateStyle.buttons}`}>
              <Button className={`${LibraryUpdateStyle.button}`} type="submit" color="primary">
                Submit
                <input hidden type="submit" value="Submit" />
              </Button>

              <Button className={`${LibraryUpdateStyle.button}`}  onClick={displayNone} color="error">
                  Cancle
                  <input hidden type="reset" value="Cancel"/>
              </Button>

            </div>
          </form>
        </div>
    </div>
  )
}

export default UpdateTeacher
