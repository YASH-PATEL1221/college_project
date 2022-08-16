import PORT from "../../PORT.js"

import React,{useState,useReducer} from 'react';

import TeacherUpdateStyle from "../../css/teacher/teacherupdate.module.css";

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
    fid:data.id,
    name:data.name,
    mobile:data.mobile,
    email:data.email,
    degree:data.degree,
    teachingsubject:data.teachingsubject,
    gender:data.gender,
    date:data.joiningdate
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
    <div className={`${TeacherUpdateStyle.body} ${ToggleDisplay ? TeacherUpdateStyle.show:TeacherUpdateStyle.none}`}>
        <div className={`${TeacherUpdateStyle.popup}`}>
          <div className={`${TeacherUpdateStyle.header}`}>
            <div className={`${TeacherUpdateStyle.left}`}>
              <span>{data.image}</span>
              <p>{data.name}</p>
            </div>
            <div className={`${TeacherUpdateStyle.right}`}>
              <IconButton onClick={displayNone}>
                <CloseIcon className={`${TeacherUpdateStyle.close}`}/>
              </IconButton>
            </div>
          </div>

          <form action={`http://localhost:${PORT}/sms/api/faculty/update_faculty.php`} id='form' method="post" className={`${TeacherUpdateStyle.form}`}>
            <input type="text" hidden name="fid" onChange={OnChange} value={`${FormData.fid}`} id="" />
            <div>
              <input type="text" onChange={OnChange} className={`${TeacherUpdateStyle.input}`} value={`${FormData.name}`} name="name"/>
            </div>

            <div className={`${TeacherUpdateStyle.row1}`}>
             <input type="text" onChange={OnChange} className={`${TeacherUpdateStyle.input}`} value={`${FormData.mobile}`} name="mobile" id="" />
              <input type="email" onChange={OnChange} className={`${TeacherUpdateStyle.input}`} value={`${FormData.email}`} name="email" id="" />
            </div>

            <div className={`${TeacherUpdateStyle.row2}`}>
              <input type="text" onChange={OnChange} className={`${TeacherUpdateStyle.input}`} value={`${FormData.degree}`} name="degree" id="" />
              <input type="text" onChange={OnChange} className={`${TeacherUpdateStyle.input}`} value={`${FormData.teachingsubject}`} name="teachingsubject" id=""/>
            </div>

            <div className={`${TeacherUpdateStyle.row3}`}>
              <select onChange={OnChange} className={`${TeacherUpdateStyle.input}`} name="gender" defaultValue={`${FormData.gender}`} id="">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input onChange={OnChange} type="date" value={FormData.date} className={`${TeacherUpdateStyle.input}`} name="date" id="" />
            </div>

            <div className={`${TeacherUpdateStyle.buttons}`}>
              <Button className={`${TeacherUpdateStyle.button}`} type="submit" color="primary">
                Submit
                <input hidden type="submit" value="Submit" />
              </Button>

              <Button className={`${TeacherUpdateStyle.button}`}  onClick={displayNone} color="error">
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
