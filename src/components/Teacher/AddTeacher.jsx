import React,{useReducer,useState} from 'react';
import PORT from "../../PORT.js";

import TeacherStyle from "../../css/teacher/teacher.add.module.css"

import Cards from "../card/Cards";

import Button from '@mui/material/Button';
import axios from 'axios';

function reducer(state,action){
  switch (action.name) {
    case "name":
      if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,name:{...state.name,[action.name]:action.value,isValid:true}}
      }
      return {...state,name:{...state.name,[action.name]:action.value,isValid:false}}

    case "phonenumber":
      if(/([0-9]+$)/.test(action.value) && action.value.length === 10){
        return {...state,phonenumber:{...state.phonenumber,[action.name]:action.value,isValid:true}}
      }
      return {...state,phonenumber:{...state.phonenumber,[action.name]:action.value,isValid:false}}

    case "email":
      if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(action.value)){
        return {...state,email:{...state.email,[action.name]:action.value,isValid:true}}
      }
      return {...state,email:{...state.email,[action.name]:action.value,isValid:false}}

    case "teachingsubject":
      if(/^[C]+[0-9]{4,4}$/.test(action.value)){
        return {...state,teachingsubject:{...state.teachingsubject,[action.name]:action.value,isValid:true}}
      }
      return {...state,teachingsubject:{...state.teachingsubject,[action.name]:action.value,isValid:false}}

    case "education":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,education:{...state.education,[action.name]:action.value,isValid:true}}
      }
      return {...state,education:{...state.education,[action.name]:action.value,isValid:false}}

    case "address":
      return {...state,address:{...state.address,[action.name]:action.value,isValid:true}}

    case "gender":
      if(action.value !== "0"){
        return {...state,gender:{...state.gender,[action.name]:action.value,isValid:true}}
      }
      return {...state,gender:{...state.gender,[action.name]:action.value,isValid:false}}

    case "joiningdate":
      if(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/.test(action.value)){
       return {...state,joiningdate:{...state.joiningdate,[action.name]:action.value,isValid:true}}
      }
      return {...state,joiningdate:{...state.joiningdate,[action.name]:action.value,isValid:false}}

    default:
      return {...state};
  }
}

function Add_teacher() {

const InitialState = {
    name:{
      name:"",
      isValid:true
    },
    phonenumber:{
      phonenumber:"",
      isValid:true
    },
    email:{
      email:"",
      isValid:true
    },
    teachingsubject:{
      teachingsubject:"",
      isValid:true
    },
    education:{
      education:"",
      isValid:true
    },
    joiningdate:{
      joiningdate:"",
      isValid:true
    },
    address:{
      address:"",
      isValid:true
    },
    gender:{
      gender:"",
      isValid:true
    }
}

const [FormData,dispatch] = useReducer(reducer,InitialState);
const [IsCourseID, setIsCourseID] = useState(true);

function textChanged(e){
    const action = {
      name: e.target.name,
      value: e.target.value 
    }

    dispatch(action);
}

function isCourseID_Available(e){
  axios.get(`http://localhost:${PORT}/sms/api/course/isCourseID_Available.php?cid=${e.target.value}`)
  .then(data => {
    setIsCourseID(!data.data.is_Available);
  })
}

  return (
    <div className={`${TeacherStyle.body}`}>
      <Cards width="95%" height="max-content" className={TeacherStyle.content}>
        <p className={`${TeacherStyle.label}`}>
          Add Teacher
        </p>
        <p className={`${TeacherStyle.course_id_available} ${IsCourseID ? TeacherStyle.hide : null}`}>course not exist</p>
        <form action="http://localhost:8000/sms/api/faculty/add_faculty.php" method="post">
          <div className={`${TeacherStyle.form}`}>
            <div className={`${TeacherStyle.section}`}>
              {/* NAME */}
              <input placeholder='Name'  type="text" name="name" id="" 
              className={`${TeacherStyle.name} ${TeacherStyle.section1_inp} ${FormData.name.isValid ? `${TeacherStyle.valid}`:`${TeacherStyle.not_valid}`} input`} 
              onChange={textChanged} value={FormData.name.name}/>

              {/* PHONE NUMBER */}
              <input placeholder='Phone Number' type="text" name="phonenumber" id=""
               className={`${TeacherStyle.phone_number} ${TeacherStyle.section1_inp} ${FormData.phonenumber.isValid ? `${TeacherStyle.valid}`:`${TeacherStyle.not_valid}`} input`} 
               onChange={textChanged} value={FormData.phonenumber.phonenumber}/>
            </div>

              
            <div className={`${TeacherStyle.section}`}>
              {/* EMAIL */}
              <input placeholder='Email' type="text" name="email" id="" 
              className={`${TeacherStyle.email} ${TeacherStyle.section1_inp} ${FormData.email.isValid ? `${TeacherStyle.valid}`:`${TeacherStyle.not_valid}`} input`} 
              onChange={textChanged} value={FormData.email.email}/>
              
              {/* COURSE ID */}
              <input placeholder='Course ID' type="text" name="teachingsubject" id="" 
              className={`${TeacherStyle.teaching_subject} ${TeacherStyle.section1_inp} ${(FormData.teachingsubject.isValid && IsCourseID) ? `${TeacherStyle.valid}`:`${TeacherStyle.not_valid}`} input`}
              onChange={textChanged} onKeyUp={isCourseID_Available} value={FormData.teachingsubject.teachingsubject}/>
            </div>
            
            <div className={`${TeacherStyle.section}`}>

              {/* EDUCATION */}
              <input placeholder='Education' type="text" name="education" id="" 
              className={`${TeacherStyle.education} ${TeacherStyle.section1_inp} ${FormData.education.isValid ? `${TeacherStyle.valid}`:`${TeacherStyle.not_valid}`} input`} 
              onChange={textChanged} value={FormData.education.education}/>

              {/* JOINING DATE */}
              <input placeholder='Joining Date' type="text" name="joiningdate" id="" 
              className={`${TeacherStyle.joining_date} ${TeacherStyle.section1_inp} ${FormData.joiningdate.isValid ? `${TeacherStyle.valid}`:`${TeacherStyle.not_valid}`} input`} 
              onChange={textChanged} value={FormData.joiningdate.joiningdate}/>
            </div>

            <div className={`${TeacherStyle.section}`}>
              {/* GENDER */}
              <select onChange={textChanged} 
              className={`${TeacherStyle.gender} ${TeacherStyle.section1_inp} ${FormData.gender.isValid ? `${TeacherStyle.gender.valid}`:`${TeacherStyle.not_valid}`} input`}
               name="gender" value={`${FormData.gender.gender}`} id="">

                <option value="0" defaultChecked>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className={`${TeacherStyle.buttons}`}>
              {console.log(
                (FormData.name.isValid &&  FormData.name.name.length > 0) &&
                (FormData.phonenumber.isValid && FormData.phonenumber.phonenumber.length >0) && 
                (FormData.email.isValid && FormData.email.email.length > 0) && 
                (FormData.teachingsubject.isValid && FormData.teachingsubject.teachingsubject.length > 0) && 
                (FormData.education.isValid && FormData.education.education.length > 0) && 
                (FormData.joiningdate.isValid && FormData.joiningdate.joiningdate.length > 0) && 
                (FormData.address.isValid && FormData.address.address.length > 0) && 
                (FormData.gender.isValid && FormData.gender.gender.length > 0)
              )}
              <Button varient="contained" type='submit' className={`${TeacherStyle.button}`} color={"success"} disabled={
                !(
                  (FormData.name.isValid &&  FormData.name.name.length > 0) &&
                  (FormData.phonenumber.isValid && FormData.phonenumber.phonenumber.length >0) && 
                  (FormData.email.isValid && FormData.email.email.length > 0) && 
                  (FormData.teachingsubject.isValid && FormData.teachingsubject.teachingsubject.length > 0 && IsCourseID) && 
                  (FormData.education.isValid && FormData.education.education.length > 0) && 
                  (FormData.joiningdate.isValid && FormData.joiningdate.joiningdate.length > 0) && 
                  (FormData.gender.isValid && FormData.gender.gender.length > 0)
                )
              }>
                  Submit
                  <input type="submit" value="Submit" hidden />
              </Button>
              <Button className={`${TeacherStyle.button}`} type="cancel" color={"primary"}>
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

export default Add_teacher
