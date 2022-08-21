import PORT from "../../PORT.js"

import React,{useState,useReducer} from 'react';

import StudentUpdateStyle from "../../css/students/Student.update.module.css";

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function reducer(state,action){
  console.log(state);
    switch(action.name){
      case "student_name":
        if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
          return {...state,student_name:{...state.student_name,[action.name]:action.value,isValid:true}}
        }
        return {...state,student_name:{...state.student_name,[action.name]:action.value,isValid:false}}
      
      case "roll_no":
        if(/(^[0-9]+$)/.test(action.value) && action.value.length <= 4){
          return {...state,roll_no:{...state.roll_no,[action.name]:action.value,isValid:true}}
        }
        return {...state,roll_no:{...state.roll_no,[action.name]:action.value,isValid:false}}

      case "dob":
        if(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/.test(action.value)){
          return {...state,dob:{...state.dob,[action.name]:action.value,isValid:true}}
        }
        return {...state,dob:{...state.dob,[action.name]:action.value,isValid:false}}

      case "address":
        return {...state,address:{...state.address,[action.name]:action.value,isValid:true}}

      case "gender":
        if(action.value.length > 0){
          console.log(action.value);
          return {...state,gender:{...state.gender,[action.name]:action.value,isValid:true}}
        }
        return {...state,gender:{...state.gender,[action.name]:action.value,isValid:false}}
      
      case "phone_number":
        if(/([0-9]+$)/.test(action.value) && action.value.length <= 10){
          return {...state,phone_number:{...state.phone_number,[action.name]:action.value,isValid:true}}
        }
        return {...state,phone_number:{...state.phone_number,[action.name]:action.value,isValid:false}}

      case "email":
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(action.value)){
          return {...state,email:{...state.email,[action.name]:action.value,isValid:true}}
        }
        return {...state,email:{...state.email,[action.name]:action.value,isValid:false}}

      case "courseid":
        if(/^[C]+[0-9]{4,4}$/.test(action.value)){
          return {...state,courseid:{...state.courseid,[action.name]:action.value,isValid:true}}
        }
        return {...state,courseid:{...state.courseid,[action.name]:action.value,isValid:false}}

      case "sid":
        if(/^[0-9]{4,4}$/.test(action.value)){
          return {...state,sid:{...state.sid,[action.name]:action.value,isValid:true}}
        }
        return {...state,sid:{...state.sid,[action.name]:action.value,isValid:false}}

      case "admission_date":
        if(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/.test(action.value)){
          return {...state,admission_date:{...state.admission_date,[action.name]:action.value,isValid:true}}
        }
        return {...state,admission_date:{...state.admission_date,[action.name]:action.value,isValid:false}}
      default:
        return {...state}
    }
}


function UpdateTeacher({data}) {
  const [ToggleDisplay, setToggleDisplay] = useState(true);

  function displayNone(){
    setToggleDisplay(!ToggleDisplay);
    window.location.reload(true);
  }


  const InitialState = {
    courseid:{
      courseid:data.cid,
      isValid:data.cid.length > 0
    },
    sid:{
      sid:data.sid,
      isValid:data.sid.length > 0
    },
    student_name:{
      student_name:data.name,
      isValid:data.name.length > 0
    },
    phone_number:{
      phone_number:data.mobile,
      isValid:data.mobile.length > 0
    },
    email:{
      email:data.email,
      isValid:data.email.length > 0
    },
    dob:{
      dob:data.dob,
      isValid:data.dob.length > 0 
    },
    gender:{
      gender:data.gender,
      isValid:data.gender.length > 0
    },
    admission_date:{
      admission_date:data.admission_date,
      isValid:data.admission_date.length > 0
    },
    address:{
      address:data.address,
      isValid:data.address.length > 0
    },
    roll_no:{
      roll_no:data.roll_no,
      isValid:data.roll_no.length > 0
    }
  }

  
  const [FormData,dispatch] = useReducer(reducer,InitialState);

  function OnChange(e){
    const action = {
      name:e.target.name,
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
              <input type="text" onChange={OnChange} 
              className={`${StudentUpdateStyle.input} ${FormData.student_name.isValid ? StudentUpdateStyle.valid : StudentUpdateStyle.invalid}`} 
              value={`${FormData.student_name.student_name}`} name="student_name"/>
            </div>

            <div className={`${StudentUpdateStyle.row1}`}>
              <input type="text" onChange={OnChange} 
              className={`${StudentUpdateStyle.input} ${FormData.email.isValid ? StudentUpdateStyle.valid : StudentUpdateStyle.invalid}`} 
              value={`${FormData.email.email}`} name="email" id="" />

              <input type="text" onChange={OnChange} 
              className={`${StudentUpdateStyle.input} ${FormData.phone_number.isValid ? StudentUpdateStyle.valid : StudentUpdateStyle.invalid}`} 
              value={`${FormData.phone_number.phone_number}`} name="phone_number" id="" />
            </div>

            <div className={`${StudentUpdateStyle.row1}`}>
              <input type="text" onChange={OnChange} 
              className={`${StudentUpdateStyle.input} ${FormData.courseid.isValid ? StudentUpdateStyle.valid : StudentUpdateStyle.invalid}`} 
              value={`${FormData.courseid.courseid}`} name="courseid"/>

              <input type="text" onChange={OnChange} 
              className={`${StudentUpdateStyle.input} ${FormData.roll_no.isValid ? StudentUpdateStyle.valid : StudentUpdateStyle.invalid}`} 
              value={`${FormData.roll_no.roll_no}`} name="roll_no" id="" />
            </div>

            <div className={`${StudentUpdateStyle.row2}`}>
              <input type="text" onChange={OnChange} className={`${StudentUpdateStyle.input} ${FormData.admission_date.isValid ? StudentUpdateStyle.valid : StudentUpdateStyle.invalid}`} 
              value={`${FormData.admission_date.admission_date}`} name="admission_date" id="" placeholder="admission_date"/>

              <input type="text" onChange={OnChange} className={`${StudentUpdateStyle.input} ${FormData.address.isValid ? StudentUpdateStyle.valid : StudentUpdateStyle.invalid}`} 
              value={`${FormData.address.address}`} name="address" id="" placeholder="address"/>
            </div>

            <div className={`${StudentUpdateStyle.row3}`}>
              <select onChange={OnChange} className={`${StudentUpdateStyle.input}`} name="gender" value={`${FormData.gender.gender}`} id="">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input onChange={OnChange} type="text" value={FormData.dob.dob} className={`${StudentUpdateStyle.input} ${FormData.dob.isValid ? StudentUpdateStyle.valid : StudentUpdateStyle.invalid}`} name="dob" id="" placeholder="date_of_birth"/>
            </div>

            <div className={`${StudentUpdateStyle.buttons}`}>
              <Button className={`${StudentUpdateStyle.button}`} type="submit" color="primary" disabled={
                !(
                  FormData.student_name.isValid &&
                  FormData.email.isValid &&
                  FormData.phone_number.isValid &&
                  FormData.courseid.isValid &&
                  FormData.roll_no.isValid &&
                  FormData.address.isValid &&
                  FormData.admission_date.isValid &&
                  FormData.dob.isValid &&
                  FormData.gender.isValid
                )
              }>
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
