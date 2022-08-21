import React,{useReducer,useState} from 'react';
import PORT from "../../PORT.js";

import StudentAddStyle from "../../css/students/student.add.module.css"

import Cards from "../card/Cards";

import Button from '@mui/material/Button';
import axios from 'axios';

function reducer(state,action){

  switch(action.name){
    case "student_name":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,student_name:{...state.student_name,[action.name]:action.value,isValid:true}}
      }
      return {...state,student_name:{...state.student_name,[action.name]:action.value,isValid:false}}
    
    case "rollno":
      if(/(^[0-9]+$)/.test(action.value) && action.value.length <= 4){
        return {...state,rollno:{...state.rollno,[action.name]:action.value,isValid:true}}
      }
      return {...state,rollno:{...state.rollno,[action.name]:action.value,isValid:false}}

    case "dob":
      if(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/.test(action.value)){
        return {...state,dob:{...state.dob,[action.name]:action.value,isValid:true}}
      }
      return {...state,dob:{...state.dob,[action.name]:action.value,isValid:false}}

    case "address":
      if(action.value.length > 0){
        return {...state,address:{...state.address,[action.name]:action.value,isValid:true}}
      }
      return {...state,address:{...state.address,[action.name]:action.value,isValid:false}}

    case "gender":
      console.log(action.value !== ' ');
      if(action.value !== ' '){
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

    case "cid":
      if(/^[C]+[0-9]{4,4}$/.test(action.value)){
        return {...state,cid:{...state.cid,[action.name]:action.value,isValid:true}}
      }
      return {...state,cid:{...state.cid,[action.name]:action.value,isValid:false}}

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



function Add_student() {

const InitialState = {
    rollno:{
      rollno:"",
      isValid:true
    },
    student_name:{
      student_name:"",
      isValid:true
    },
    dob:{
      dob:"",
      isValid:true
    },
    address:{
      address:"",
      isValid:true
    },
    gender:{
      gender:"",
      isValid:true
    },
    admission_date:{
      admission_date:"",
      isValid:true
    },
    phone_number:{
      phone_number:"",
      isValid:true
    },
    email:{
      email:"",
      isValid:true
    },
    cid:{
      cid:"",
      isValid:true
    },
    sid:{
      sid:"",
      isValid:true
    },
    isFormValid:[]
}




const [StudentData,dispatch] = useReducer(reducer,InitialState);

const [IsCourseID, setIsCourseID] = useState(true);
const [IsSID, setIsSID] = useState(false);
const [IsRollno, setRollno] = useState(false);



function textChanged(e){
    const action = {
      name: e.target.name,
      value: e.target.value,
    }

    dispatch(action);
}
function isCourseID_Available(e){
  axios.get(`http://localhost:${PORT}/sms/api/course/isCourseID_Available.php?cid=${e.target.value}`)
  .then(data => {
    console.log(data.data)
    setIsCourseID(!data.data.is_Available);
  })
}

function isSID_Available(e){
  axios.get(`http://localhost:${PORT}/sms/api/course/isCourseID_Available.php?sid=${e.target.value}`)
  .then(data => {
    console.log(data.data)
    setIsSID(!data.data.is_Available);
  })
}

function isRollno_Available(e){
  axios.get(`http://localhost:${PORT}/sms/api/course/isCourseID_Available.php?rollno=${e.target.value}`)
  .then(data => {
    console.log(data.data)
    setRollno(!data.data.is_Available);
  })
}



  return (
    <div className={`${StudentAddStyle.body}`}>
      <Cards width="95%" height="max-content" className={StudentAddStyle.content}>
        <p className={`${StudentAddStyle.label}`}>
          Add Student
        </p>
        {console.log(IsCourseID)}
        <p className={`${StudentAddStyle.course_id_available} ${IsCourseID ? StudentAddStyle.hide : ""}`}>course not exist</p>
        <p className={`${StudentAddStyle.sid_available} ${!IsSID ? StudentAddStyle.hide : ""}`}>student id not available</p>
        <p className={`${StudentAddStyle.rollno_available} ${!IsRollno ? StudentAddStyle.hide : ""}`}>rollno not available</p>

        <form action="http://localhost:8000/sms/api/student/add_students.php" name='form' method="post" >
          <div className={`${StudentAddStyle.form}`}>
            <div className={`${StudentAddStyle.section}`}>

              {/* SID */}
              {/* {console.log(IsSID)} */}
              <input placeholder='SID'  type="text" name="sid" id="" 
                className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.sid} ${!(StudentData.sid.isValid && !IsSID) ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} onKeyUp={isSID_Available} value={StudentData.sid.value}/>

              {/* Student name */}
              <input placeholder='Student name'  type="text" name="student_name" id="" 
              className={`${StudentAddStyle.student_name}  ${StudentAddStyle.input} ${!StudentData.student_name.isValid ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
              onChange={textChanged} value={StudentData.student_name.value}/>
            </div>

            <div className={`${StudentAddStyle.section}`}>
              {/* Roll number */}
              <input placeholder='Roll number'  type="text" name="rollno" id="" 
                className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.roll_no} ${!(StudentData.rollno.isValid && !IsRollno) ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} onKeyUp={isRollno_Available} value={StudentData.rollno.value}/>

              {/* Date of birth */}
              <input placeholder='Date of birth'  type="text" name="dob" id="" 
                className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.dob} ${!StudentData.dob.isValid ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} value={StudentData.dob.value}/>
            </div>
            
            <div className={`${StudentAddStyle.section}`}>
              {/* Address */}
              <input placeholder='Address'  type="text" name="address" id="" 
                className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.address} ${!StudentData.address.isValid ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} value={StudentData.address.value}/>

              {/* Gender */}
              <select name="gender" id="" className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.gender} ${!StudentData.gender.isValid ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} value={StudentData.gender.value}>
                <option value=" ">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className={`${StudentAddStyle.section}`}>
              {/* Admission date */}
              <input placeholder='Admission date'  type="text" name="admission_date" id="" 
                className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.admission_date} ${!StudentData.admission_date.isValid ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} value={StudentData.admission_date.value}/>

              {/* Phone number */}
              <input placeholder='Phone number'  type="text" name="phone_number" id="" 
                className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.phone_number} ${!StudentData.phone_number.isValid ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} value={StudentData.phone_number.value}/>
            </div>

            <div className={`${StudentAddStyle.section}`}>
              {/* Email */}
              <input placeholder='Email'  type="text" name="email" id="" 
                className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.email} ${!StudentData.email.isValid ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} value={StudentData.email.value}/>

              {/* Course ID */}
              <input placeholder='Course ID'  type="text" name="cid" id="" 
                className={`${StudentAddStyle.name} ${StudentAddStyle.input} ${StudentAddStyle.cid} ${!(StudentData.cid.isValid && IsCourseID) ? `${StudentAddStyle.not_valid}`:`${StudentAddStyle.valid}`} input`} 
                onChange={textChanged} onKeyUp={isCourseID_Available} value={StudentData.cid.value}/>
            </div>

            <div className={`${StudentAddStyle.buttons}`}>

              <Button varient="contained" type='submit' name="submit" className={`${StudentAddStyle.button}`} color={"success"} disabled={
                
                  (
                    (StudentData.student_name.isValid && (StudentData.student_name.student_name.length > 0)) &&
                    (StudentData.sid.isValid && (StudentData.sid.sid.length > 0)) &&
                    (StudentData.rollno.isValid && (StudentData.rollno.rollno.length > 0)) &&
                    (StudentData.dob.isValid && (StudentData.dob.dob.length > 0)) &&
                    (StudentData.address.isValid && (StudentData.address.address.length > 0)) &&
                    (StudentData.gender.isValid && (StudentData.gender.gender.length > 0)) &&
                    (StudentData.admission_date.isValid && (StudentData.admission_date.admission_date.length > 0)) &&
                    (StudentData.phone_number.isValid && (StudentData.phone_number.phone_number.length > 0)) &&
                    (StudentData.email.isValid && (StudentData.email.email.length > 0)) &&
                    (StudentData.cid.isValid && (StudentData.cid.cid.length > 0)) 
                  ) || false
                 ? false : true}>
                  Submit
                  <input type="submit" className='submit_button' name='submit_button' value="Submit" hidden />
              </Button>
              <Button className={`${StudentAddStyle.button}`} type="cancel" color={"primary"}>
                  Cancel
                  <input type="submit" value="Cancel" hidden />
              </Button>
            </div>
          </div>
        </form>
      </Cards>
    </div>
  )
}

export default Add_student;