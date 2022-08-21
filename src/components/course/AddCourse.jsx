import React,{useReducer,useState} from 'react';

import CourseAddStyle from "../../css/course/course.add.module.css";

import Cards from "../card/Cards";

import Button from '@mui/material/Button';
import axios from 'axios';
import PORT from '../../PORT';

function reducer(state,action){
  switch(action.name){
    case "course_name":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,course_name:{...state.course_name,[action.name]:action.value,isValid:true}}
      }
      return {...state,course_name:{...state.course_name,[action.name]:action.value,isValid:false}}
    
    case "course_description":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,course_description:{...state.course_description,[action.name]:action.value,isValid:true}}
      }
      return {...state,course_description:{...state.course_description,[action.name]:action.value,isValid:false}}

    case "course_id":
      if(/^[C]+[0-9]{4,4}$/.test(action.value)){
        return {...state,course_id:{...state.course_id,[action.name]:action.value,isValid:true}}
      }
      return {...state,course_id:{...state.course_id,[action.name]:action.value,isValid:false}}

    case "teaching_faculty":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,teaching_faculty:{...state.teaching_faculty,[action.name]:action.value,isValid:true}}
      }
      return {...state,teaching_faculty:{...state.teaching_faculty,[action.name]:action.value,isValid:false}}
    
    default:
      return {...state}
  }
}

function AddCourse() {

const InitialState = {
    course_description:{
      course_description:"",
      isValid:true
    },
    course_name:{
      course_name:"",
      isValid:true
    },
    course_id:{
      course_id:"",
      isValid:true
    },
    teaching_faculty:{
      teaching_faculty:"",
      isValid:true
    }
}


const [CourseData,dispatch] = useReducer(reducer,InitialState);
const [IsCourseID, setIsCourseID] = useState(true);



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
    setIsCourseID(data.data.is_Available);
  })
}

return (
<div className={`${CourseAddStyle.body}`}>
    <Cards width="95%" height="max-content" className={CourseAddStyle.content}>
    <p className={`${CourseAddStyle.label}`}>
        Add Course
    </p>
    <p className={`${CourseAddStyle.course_id_available} ${IsCourseID ? CourseAddStyle.hide : null}`}>course id not available</p>
    <form action={`http://localhost:${PORT}/sms/api/Course/add_Courses.php`} name='form' method="post" >
        <div className={`${CourseAddStyle.form}`}>
        <div className={`${CourseAddStyle.section}`}>

            {/* course ID */}
            <input placeholder='course id'  type="text" name="course_id" id=""
            className={`${CourseAddStyle.name} ${CourseAddStyle.input} ${CourseAddStyle.course_id} ${(CourseData.course_id.isValid && IsCourseID) ? `${CourseAddStyle.valid}`:`${CourseAddStyle.not_valid}`} input`} 
            onChange={textChanged} onKeyUp={isCourseID_Available} value={CourseData.course_id.course_id}/>
            

            {/* Course name */}
            <input placeholder='Course name'  type="text" name="course_name" id="" 
            className={`${CourseAddStyle.course_name}  ${CourseAddStyle.input} ${CourseData.course_name.isValid ? `${CourseAddStyle.valid}`:`${CourseAddStyle.not_valid}`} input`} 
            onChange={textChanged} value={CourseData.course_name.course_name}/>
        </div>
        

        <div className={`${CourseAddStyle.section}`}>
            {/* Course Description */}
            <input placeholder='course description'  type="text" name="course_description" id="" 
            className={`${CourseAddStyle.name} ${CourseAddStyle.input} ${CourseAddStyle.course_description} ${CourseData.course_description.isValid ? `${CourseAddStyle.valid}`:`${CourseAddStyle.not_valid}`} input`} 
            onChange={textChanged} value={CourseData.course_description.course_description}/>

            {/* Teaching faculty */}
            <input placeholder='Teaching faculty'  type="text" name="teaching_faculty" id="" 
            className={`${CourseAddStyle.name} ${CourseAddStyle.input} ${CourseAddStyle.teaching_faculty} ${CourseData.teaching_faculty.isValid ? `${CourseAddStyle.valid}`:`${CourseAddStyle.not_valid}`} input`} 
            onChange={textChanged} value={CourseData.teaching_faculty.teaching_faculty}/>
        </div>

        <div className={`${CourseAddStyle.buttons}`}>
                {console.log(
                  !(
                    ((CourseData.course_name.length > 0)) &&
                    ((CourseData.course_id.length > 0)) &&
                    ((CourseData.course_description.length > 0)) &&
                    ((CourseData.teaching_faculty.length > 0))
                  )
                )}
            <Button varient="contained" type='submit' name="submit" className={`${CourseAddStyle.button}`} color={"success"} disabled={
            
                !(
                  (CourseData.course_name.isValid && CourseData.course_name.course_name.length > 0) &&
                  (CourseData.course_id.isValid && CourseData.course_id.course_id.length > 0 && IsCourseID) &&
                  (CourseData.course_description.isValid && CourseData.course_description.course_description.length > 0) &&
                  (CourseData.teaching_faculty.isValid && CourseData.teaching_faculty.teaching_faculty.length > 0)
                )
                }>
                Submit
                <input type="submit" className='submit_button' name='submit_button' value="Submit" hidden />
            </Button>
            <Button className={`${CourseAddStyle.button}`} type="reset" color={"primary"}>
                Reset
                <input type="reset" value="Cancel" hidden />
            </Button>
        </div>
        </div>
    </form>
    </Cards>
</div>
)
}

export default AddCourse;