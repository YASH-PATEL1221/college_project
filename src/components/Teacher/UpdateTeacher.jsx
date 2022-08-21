import PORT from "../../PORT.js"

import React,{useState,useReducer} from 'react';

import TeacherUpdateStyle from "../../css/teacher/teacherupdate.module.css";

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { faClose } from "@fortawesome/free-solid-svg-icons";

function reducer(state,action){
  console.log(state);
  switch(action.name){
    case "name":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,name:{...state.name,[action.name]:action.value,isValid:true}}
      }
      return {...state,name:{...state.name,[action.name]:action.value,isValid:false}}

    case "date":
      if(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/.test(action.value)){
        return {...state,date:{...state.date,[action.name]:action.value,isValid:true}}
      }
      return {...state,date:{...state.date,[action.name]:action.value,isValid:false}}

    case "address":
      return {...state,address:{...state.address,[action.name]:action.value,isValid:true}}

    case "gender":
      if(action.value !==  0){
        return {...state,gender:{...state.gender,[action.name]:action.value,isValid:true}}
      }
      return {...state,gender:{...state.gender,[action.name]:action.value,isValid:false}}
    
    case "phone_number":
      if(/([0-9]+$)/.test(action.value) && action.value.length <= 10){
        return {...state,phone_number:{...state.phone_number,[action.name]:action.value,isValid:true}}
      }
      return {...state,phone_number:{...state.phone_number,[action.name]:action.value,isValid:false}}

    case "teachingsubject":
      if(/(^[C]+[0-9]+$)/.test(action.value) && action.value.length <= 10){
        return {...state,teachingsubject:{...state.teachingsubject,[action.name]:action.value,isValid:true}}
      }
      return {...state,teachingsubject:{...state.teachingsubject,[action.name]:action.value,isValid:false}}

    case "email":
      if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(action.value)){
        return {...state,email:{...state.email,[action.name]:action.value,isValid:true}}
      }
      return {...state,email:{...state.email,[action.name]:action.value,isValid:false}}

    case "degree":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,degree:{...state.degree,[action.name]:action.value,isValid:true}}
      }
      return {...state,degree:{...state.degree,[action.name]:action.value,isValid:false}}

    case "mobile":
      if(/[0-9]{10,10}$/.test(action.value)){
        return {...state,mobile:{...state.mobile,[action.name]:action.value,isValid:true}}
      }
      return {...state,mobile:{...state.mobile,[action.name]:action.value,isValid:false}}

    default:
      return {...state}
  }
}


function UpdateTeacher({data}) {
  const [ToggleDisplay, setToggleDisplay] = useState(data.status);

  function displayNone(){
    setToggleDisplay(false);
    window.location.reload(true);
  }


  const InitialState = {
    fid:{
      fid:data.id,
      isValid:data.id.length > 0
    },
    name:{
      name:data.name,
      isValid:data.name.length > 0
    },
    mobile:{
      mobile:data.mobile,
      isValid:data.mobile.length > 0
    },
    email:{
      email:data.email,
      isValid:data.email.length > 0
    },
    degree:{
      degree:data.degree,
      isValid:data.degree.length > 0
    },
    teachingsubject:{
      teachingsubject:data.teachingsubject,
      isValid:data.teachingsubject.length > 0
    },
    gender:{
      gender:data.gender,
      isValid:data.gender.length > 0
    },
    date:{
      date:data.joiningdate,
      isValid:data.joiningdate.length > 0
    }
  }
  
  
  const [FormData,dispatch] = useReducer(reducer,InitialState);

  function TextChange(e){
    const action = {
      name:e.target.name,
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
            <input type="text" hidden name="fid" onChange={TextChange} value={`${FormData.fid.fid}`} id="" />
            <div>
              <input type="text" onChange={TextChange} className={`${TeacherUpdateStyle.input} ${(FormData.name.isValid) ? TeacherUpdateStyle.valid : TeacherUpdateStyle.invalid}`} value={`${FormData.name.name}`} name="name"/>
            </div>

            <div className={`${TeacherUpdateStyle.row1}`}>
             <input type="text" onChange={TextChange}
             className={`${TeacherUpdateStyle.input} ${(FormData.mobile.isValid) ? TeacherUpdateStyle.valid : TeacherUpdateStyle.invalid}`} 
             value={`${FormData.mobile.mobile}`} name="mobile" id="" />

              <input type="email" onChange={TextChange}
              className={`${TeacherUpdateStyle.input} ${(FormData.email.isValid) ? TeacherUpdateStyle.valid : TeacherUpdateStyle.invalid}`} 
              value={`${FormData.email.email}`} name="email" id="" />
            </div>

            <div className={`${TeacherUpdateStyle.row2}`}>
              <input type="text" onChange={TextChange} 
              className={`${TeacherUpdateStyle.input} ${(FormData.degree.isValid) ? TeacherUpdateStyle.valid : TeacherUpdateStyle.invalid}`} 
              value={`${FormData.degree.degree}`} name="degree" id="" />

              <input type="text" onChange={TextChange} 
              className={`${TeacherUpdateStyle.input} ${(FormData.teachingsubject.isValid) ? TeacherUpdateStyle.valid : TeacherUpdateStyle.invalid}`} 
              value={`${FormData.teachingsubject.teachingsubject}`} name="teachingsubject" id=""/>
            </div>

            <div className={`${TeacherUpdateStyle.row3}`}>
              <select onChange={TextChange} 
              className={`${TeacherUpdateStyle.input} ${(FormData.gender.isValid) ? TeacherUpdateStyle.valid : TeacherUpdateStyle.invalid}`} 
              name="gender" value={`${FormData.gender.gender}`} id="">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input onChange={TextChange} type="text" value={FormData.date.date}
               className={`${TeacherUpdateStyle.input} ${(FormData.date.isValid) ? TeacherUpdateStyle.valid : TeacherUpdateStyle.invalid}`} 
               name="date" id="" />
            </div>

            <div className={`${TeacherUpdateStyle.buttons}`}>
              {console.log( (
                  FormData.mobile.isValid &&
                  FormData.fid.isValid &&
                  FormData.name.isValid &&
                  FormData.email.isValid &&
                  FormData.degree.isValid &&
                  FormData.teachingsubject.isValid &&
                  FormData.gender.isValid &&
                  FormData.date.isValid  
                ))}
              <Button className={`${TeacherUpdateStyle.button}`} type="submit" color="primary" disabled={
                (
                  FormData.mobile.isValid &&
                  FormData.fid.isValid &&
                  FormData.name.isValid &&
                  FormData.email.isValid &&
                  FormData.degree.isValid &&
                  FormData.teachingsubject.isValid &&
                  FormData.gender.isValid &&
                  FormData.date.isValid  
                )
                 ? !true : true }>
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
