import React,{useState,useEffect, useReducer} from 'react';

import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import PORT from "../../PORT.js"

import Cards from "../card/Cards.js";
import axios from "axios"

import CourseListStyle from "../../css/course/course.list.module.css";



function ListCourse() {
    const [CourseDetail, setCourseDetail] = useState([]);
    const [StateOfUpdateData, setStateOfUpdateData] = useState({
        course_name:'',
        course_id:'',
        teaching_faculty:'',
        display:false
    });

    const [StateOfDeleteData, setStateOfDeleteData] = useState({
        course_name:'',
        course_id:'',
        teaching_faculty:'',
        display:false
    });


   useEffect(() => {
    
    axios.get(`http://localhost:${PORT}/sms/api/course/get_courses.php`)
    .then(response => {
        setCourseDetail(response.data.data);
    })
    .catch(err => {
        console.log(err);
    });

   }, []);

    //  Update component

    function UpdateReducer(state,action){

        switch(action.name){
            case "course_name":
                if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
                    return {...state,course_name:{...state.course_name,[action.name]:action.value,isValid:true}}
                }
                return {...state,course_name:{...state.course_name,[action.name]:action.value,isValid:false}}
        
            case "teaching_faculty":
                if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
                    return {...state,teaching_faculty:{...state.teaching_faculty,[action.name]:action.value,isValid:true}}
                }
                return {...state,teaching_faculty:{...state.teaching_faculty,[action.name]:action.value,isValid:false}}

            default:
                return {...state}
        }  
    }

function DeleteComponent(){

    const data = {
        course_name:"",
        course_id:"",
        teaching_faculty:"",
        display:false
    }

    function hideForm(){
        setStateOfDeleteData(data)
    }

    const InitialState = {
        course_name:{
            course_name:StateOfDeleteData.course_name,
        },
        teaching_faculty:{
            teaching_faculty:StateOfDeleteData.teaching_faculty,
        },
        course_id:{
            course_id:StateOfDeleteData.course_id,
        }
    }
    
    const [CourseData, setCourseData] = useState(InitialState);
    const [IsChecked, setIsChecked] = useState(false);

    function setCheck(e){
        if (e.target.checked) {
            console.log('✅ Checkbox is checked');
          } else {
            console.log('⛔️ Checkbox is NOT checked');
          }
          setIsChecked(!IsChecked);
    }

    return(
        <div className={`${CourseListStyle.update}  ${StateOfDeleteData.display ? CourseListStyle.show : CourseListStyle.hide}`}>
            <form action={`http://localhost:${PORT}/sms/api/course/delete_courses.php?id=${CourseData.course_id.course_id}`} method="post" className={`${CourseListStyle.form}`}>
                <div className={`${CourseListStyle.close_button_block}`}>
                    <IconButton onClick={hideForm}>
                        <CloseIcon className={`${CourseListStyle.close_button}`}/>
                    </IconButton>
                </div>

                <div className={`${CourseListStyle.form_inputs}`}>
                    <input type="text" name="course_name" readOnly
                    defaultValue={CourseData.course_name.course_name} id=""
                    className={`${CourseListStyle.course_name} ${CourseListStyle.input}`}
                    />

                    <br />
                    
                    <input type="text" name="teaching_faculty" readOnly
                    defaultValue={CourseData.teaching_faculty.teaching_faculty} id=""
                    className={`${CourseListStyle.teaching_faculty} ${CourseListStyle.input}`}
                    />

                    
                    <br />


                    <input type="text" name="course_id" readOnly
                    className={`${CourseListStyle.teaching_faculty} ${CourseListStyle.input}`}
                    defaultValue={CourseData.course_id.course_id} id=""
                    />
                </div>

                <div className={`${CourseListStyle.delete_buttons}`}>
                    <Button variant="contained" color="error" disabled={!IsChecked} component="label" >
                            Delete
                        <input hidden type={"submit"} />
                    </Button>
                </div>

                <p className={`${CourseListStyle.message}`}>Are you sure ? <input type="checkbox" value={IsChecked} onChange={setCheck} name="" id="" /></p>
            </form>
        </div>
    )
}


function UpdateComponent(){

    const data = {
        course_name:"",
        course_id:"",
        teaching_faculty:"",
        display:false
    }

    function hideForm(){
        setStateOfUpdateData(data)
    }

    const InitialState = {
        course_name:{
            course_name:StateOfUpdateData.course_name,
            isValid:StateOfUpdateData.course_name.length > 0
        },
        teaching_faculty:{
            teaching_faculty:StateOfUpdateData.teaching_faculty,
            isValid:StateOfUpdateData.teaching_faculty.length > 0
        },
        course_id:{
            course_id:StateOfUpdateData.course_id,
            isValid:StateOfUpdateData.course_id.length > 0
        }
    }
    
    const [CourseData,dispatch] = useReducer(UpdateReducer,InitialState);
    function ValidateInputs(e){
        const action = {
            name:e.target.name,
            value:e.target.value,
        }
        dispatch(action);
    }


    return(
        <div className={`${CourseListStyle.update} ${StateOfUpdateData.display ? CourseListStyle.show : CourseListStyle.hide}`}>
            <form action={`http://localhost:${PORT}/sms/api/course/update_courses.php`} method="post" className={`${CourseListStyle.form}`}>
                <div className={`${CourseListStyle.close_button_block}`}>
                    <IconButton onClick={hideForm}>
                        <CloseIcon className={`${CourseListStyle.close_button}`}/>
                    </IconButton>
                </div>

                <div className={`${CourseListStyle.form_inputs}`}>
                    <input type="text" name="course_name" 
                    defaultValue={CourseData.course_name.course_name} id="" onChange={ValidateInputs}
                    className={`${CourseListStyle.course_name} ${CourseListStyle.input} ${!CourseData.course_name.isValid ? `${CourseListStyle.not_valid}`:`${CourseListStyle.valid}`}`}
                    />

                    <br />
                    
                    <input type="text" name="teaching_faculty" 
                    defaultValue={CourseData.teaching_faculty.teaching_faculty} id="" onChange={ValidateInputs}
                    className={`${CourseListStyle.teaching_faculty} ${CourseListStyle.input} ${!CourseData.teaching_faculty.isValid ? `${CourseListStyle.not_valid}`:`${CourseListStyle.valid}`}`}
                    />

                    <input type="text" hidden name="course_id" 
                    defaultValue={CourseData.course_id.course_id} id=""
                    />
                </div>

                <div className={`${CourseListStyle.buttons}`}>
                    <Button variant="contained" color="success" component="label" disabled={
                    
                        (
                        (CourseData.course_name.isValid && (CourseData.course_name.course_name.length > 0)) &&
                        (CourseData.teaching_faculty.isValid && (CourseData.teaching_faculty.teaching_faculty.length > 0))
                        ) || false
                        ? false : true}>
                            Submit
                        <input hidden type={"submit"} />
                    </Button>

                    <Button variant="contained" type='reset' component="label">
                        reset
                        <input type="reset" value="" hidden />
                    </Button>
                </div>
            </form>
        </div>
    );
}

   const CourseCards = ({course_name,course_id,teaching_faculty,getData}) => {
    const data = {
        course_name:course_name,
        course_id:course_id,
        teaching_faculty:teaching_faculty,
        display:true
    }


    const SendUpdateData = () => setStateOfUpdateData(data);

    const SendDeleteData = () => setStateOfDeleteData(data);

    return(
        <Cards className={`${CourseListStyle.card} Course_cards`}>
            
            <div className={`${CourseListStyle.images}`}>
                <img src="https://www.einfosoft.com/templates/admin/smartangular/source/dark/assets/images/banner/course1.png" alt="" />
            </div>
            <div className={`${CourseListStyle.content}`}>
                <div className={`${CourseListStyle.section1}`}>
                    <img src="https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg" alt="" />
                    <div id='course_details'>
                        <span className={`${CourseListStyle.course_name}`}>{course_name}</span><br />
                        <span>{teaching_faculty}</span>
                    </div>
                </div>
                <div className={`${CourseListStyle.section2}`}>
                    <p className={`${CourseListStyle.description}`}>
                        In this course, you'll explore the basic structure of a web application, and how a web browser 
                        interacts with a web server,as well as the basic syntax and data structures of the PHP language
                    </p>
                </div>
                <div className={`${CourseListStyle.section3}`}> 
                    <Button  className={`${CourseListStyle.button}`} variant="contained">
                        Read More
                    </Button>
                    <div>
                        <IconButton onClick={SendUpdateData}>
                            <EditIcon style={{"color":"#6777ef"}}/>
                        </IconButton>
                        
                        <IconButton name="delete" onClick={SendDeleteData}>
                            <DeleteOutlineOutlinedIcon  style={{"color":"#ff5200"}}/>
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className={`${CourseListStyle.bottom}`}>
                <FavoriteIcon className={`${CourseListStyle.heart_icon}`}/><span className={`${CourseListStyle.heart_icon}`}>822</span>
                <MessageIcon className={`${CourseListStyle.comment_icon}`}/><span className={`${CourseListStyle.comment_icon}`}>822</span>
            </div>
        </Cards>
    );
   }

   function showCourses(e){
        let value = e.target.value;
        let CoursesCards = document.querySelectorAll(".Course_cards");
        CoursesCards.forEach(Course => {
            if(Course.childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerText.toUpperCase().includes(value.toUpperCase())){
                return Course.style.display = "";
            }
            return Course.style.display = "none";
        })
   }


  return (
   <div className={`${CourseListStyle.body}`}>
    <UpdateComponent/>
    <DeleteComponent/>
    <Cards>
        <p className={`${CourseListStyle.title}`}>All Courses
            <input type="text" onChange={showCourses} className={`${CourseListStyle.search_bar}`} placeholder={"Search courses"} name="" id="" />
        </p>
        <div className={`${CourseListStyle.grid}`}>
            {
                CourseDetail.map((data,index) => {
                    return(
                        <CourseCards index={index} course_name={data.course_name} course_id={data.course_id} teaching_faculty={data.teaching_faculty}/>
                    )
                })
            }
        </div>
    </Cards>
   </div>
  )
}

export default ListCourse;