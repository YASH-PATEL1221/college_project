import PORT from "../../PORT.js"

import React,{useState,useReducer} from 'react';

import StudentUpdateStyle from "../../css/students/Student.update.module.css";

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
    courseid:data.cid,
    sid:data.sid,
    student_name:data.name,
    phone_no:data.mobile,
    email:data.email,
    degree:data.degree,
    dob:data.dob,
    gender:data.gender,
    admission_date:data.admission_date,
    address:data.address,
    roll_no:data.roll_no
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
    <div className={`${StudentUpdateStyle.body} ${ToggleDisplay ? StudentUpdateStyle.show:StudentUpdateStyle.none}`}>
        <div className={`${StudentUpdateStyle.popup}`}>
          <div className={`${StudentUpdateStyle.header}`}>
            <div className={`${StudentUpdateStyle.left}`}>
              <span>{data.image}</span>
              <p>{data.name}</p>
            </div>
            <div className={`${StudentUpdateStyle.right}`}>
              <IconButton onClick={displayNone}>
                <CloseIcon className={`${StudentUpdateStyle.close}`}/>
              </IconButton>
            </div>
          </div>

          <form action={`http://localhost:${PORT}/sms/api/student/update_students.php`} id='form' method="post" className={`${StudentUpdateStyle.form}`}>
            <input type="text" hidden name="sid" onChange={OnChange} value={`${FormData.sid}`} id="" />
            <div>
              <input type="text" onChange={OnChange} className={`${StudentUpdateStyle.input}`} value={`${FormData.student_name}`} name="student_name"/>
            </div>

            <div className={`${StudentUpdateStyle.row1}`}>
              <input type="text" onChange={OnChange} className={`${StudentUpdateStyle.input}`} value={`${FormData.phone_no}`} name="phone_no" id="" />
              <input type="email" onChange={OnChange} className={`${StudentUpdateStyle.input}`} value={`${FormData.email}`} name="email" id="" />
            </div>

            <div className={`${StudentUpdateStyle.row1}`}>
              <input type="text" onChange={OnChange} className={`${StudentUpdateStyle.input}`} value={`${FormData.courseid}`} name="courseid"/>
              <input type="text" onChange={OnChange} className={`${StudentUpdateStyle.input}`} value={`${FormData.roll_no}`} name="roll_no" id="" />
            </div>

            <div className={`${StudentUpdateStyle.row2}`}>
              <input type="date" onChange={OnChange} className={`${StudentUpdateStyle.input}`} value={`${FormData.admission_date}`} name="admission_date" id="" placeholder="admission_date"/>
              <input type="text" onChange={OnChange} className={`${StudentUpdateStyle.input}`} value={`${FormData.address}`} name="address" id="" placeholder="address"/>
            </div>

            <div className={`${StudentUpdateStyle.row3}`}>
              <select onChange={OnChange} className={`${StudentUpdateStyle.input}`} name="gender" defaultValue={`${FormData.gender}`} id="">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input onChange={OnChange} type="date" value={FormData.dob} className={`${StudentUpdateStyle.input}`} name="dob" id="" placeholder="date_of_birth"/>
            </div>

            <div className={`${StudentUpdateStyle.buttons}`}>
              <Button className={`${StudentUpdateStyle.button}`} type="submit" color="primary">
                Submit
                <input hidden type="submit" value="Submit" />
              </Button>

              <Button className={`${StudentUpdateStyle.button}`}  onClick={displayNone} color="error">
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
