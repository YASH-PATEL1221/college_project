import PORT from '../../PORT.js'

import React,{useEffect,useState} from 'react';
import axios from 'axios';

import Cards from '../card/Cards';
import Table from 'react-bootstrap/esm/Table';

import TeacherListStyle from "../../css/teacher/teacher.list.module.css";

import TableRows from './table_rows/TableRows';
import UpdateTeacher from "../Teacher/UpdateTeacher.jsx";
import DeleteTeacher from './DeleteTeacher';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';


function ListTeacher() {
    // DISPLAY ONLY SPECIFIC NO OF ROWS ON USER INPUT OR SELECT
    const [TeacherData, setTeacherData] = useState([]);
    // const [ViewTeachers, setViewTeachers] = useState([]);

    const [Counter, setCounter] = useState(1);          // COUNTER STATE
    const [PerPage, setPerPage] = useState(5);          // SET ROWS PER PAGE
    const [StartIndex, setStartIndex] = useState(0);    // SATRTING INDEX
    const [ID,setID] = useState("");

    let ViewTeachers;

    let no_of_rows_per_page = PerPage;
    let EndIndex = no_of_rows_per_page * Counter;       // ENDING INDEX

    // SLICING ARRAY BASE ON NO OF ROWS PER PAGE
    if(TeacherData.length > 0){
        ViewTeachers = TeacherData.slice(StartIndex,EndIndex);
    }
    
    console.log(StartIndex,EndIndex);

    // SEARCH TEXT IN NAME COLUMN
    function ShowRows(e){
        let value = e.target.value;
        let rows = document.querySelectorAll(".rows");
        rows.forEach(row => {
            if(row.childNodes[1].innerText.toUpperCase().includes(value.toUpperCase())){
                row.style.display = "";
            }else{
                row.style.display = "none";
            }
        });
    }

    // INCREMENT COUNTER 
    function CounterInce(){
        setCounter(Counter + 1);
        setStartIndex(StartIndex + PerPage);
    }

    // DECREMENT COUNTER 
    function CounterDece(){
        setCounter(Counter - 1);
        setStartIndex(StartIndex - PerPage);
    }

    // ITEMS PER PAGE
    function Items_per_page(e){
        setPerPage(e.target.value);
    }


    // GETTING DATA FROM SERVER
    useEffect(() => {
        console.log("getting data....");
        axios.get(`http://localhost:${PORT}/sms/api/faculty/get_faculty.php`)
        .then(data => setTeacherData(data.data.data));
    }, []);



    const [SendingData, setSendingData] = useState({status:null});

    const Update_popup = (data) => {
        setSendingData(data);
    };


    return (
    <div className={`${TeacherListStyle.body}`}>

        {/* TO DISPLAY POPUP TO USER TO UPDATE TEACHER`S DATA*/}
        {console.log(SendingData.status)}

        {/* {SendingData.status !== null} */}

        {SendingData.status === true? <UpdateTeacher data={SendingData} />:<></>} {/* conditional rendring of update teacher*/}
        {SendingData.status === false ? <DeleteTeacher data={SendingData}/>:<></>}  {/* conditional rendring of delete teacher*/}

        {/* RENDERING SEARCH BAR */}
        <Cards height="max-content" width="96%" className={`${TeacherListStyle.teacher__style}`}>
        <div className={`${TeacherListStyle.heading}`}>
            <p>Teacher</p>
            <input type="text" name="" id="" onChange={ShowRows} placeholder='Search'/>
        </div>
        {/* SHOW TABLE */}
        {TeacherData.length <= 0 ? <p className={`${TeacherListStyle.no_records}`}>No records found</p>: 
        
                    <Table className={`${TeacherListStyle.table}`}>
                        <thead>
                            <tr>
                                <td>Images</td>
                                <td>Name</td>
                                <td>Mobile</td>
                                <td>Email</td>
                                <td>Degree</td>
                                <td>Teaching subject</td>
                                <td>Gender</td>
                                <td>Joining date</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody className={`${TeacherListStyle.table_body}`}>
                            {/* ITERATE THROUCH VIEWS ARRAY  */}
                            {
                                ViewTeachers.map((d,index) => {
                                    return(
                                        <TableRows 
                                            id={`${d.FID}`} 
                                            Update_popup={Update_popup}
                                            Image={<Avatar src={require('../../asset/person.jpg')} />} 
                                            key={index} 
                                            Name={`${d.name}`} 
                                            Mobile={`${d.phone_no}`} 
                                            Email={`${d.email}`} 
                                            Degree={`${d.education}`} 
                                            TeachingSubject={`${d.teaching_subject}`} 
                                            Gender={`${d.gender}`} 
                                            JoiningDate={`${d.joining_date}`}
                                        />
                                    )
                                })
                            }

                        </tbody>
                    </Table>
        }

        {/* CONTROL NO. OF ITEMS PER PAGE */}
        {TeacherData.length <= 0 ? <></>: 
        
            <div className={`${TeacherListStyle.show_items}`}>
                <div className={`${TeacherListStyle.section1}`}>
                    <p>items per page</p>
                    <select onChange={Items_per_page} className={`${TeacherListStyle.num_of_rows}`}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className={`${TeacherListStyle.section2}`}>
                    <p>1 - {EndIndex} of {TeacherData.length}</p>
                </div>
                <div className={`${TeacherListStyle.section3}`}>
                    <IconButton disabled={StartIndex === 0 ? true: false} onClick={CounterDece} className={`${TeacherListStyle.arrow__buttons}`}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <IconButton disabled={EndIndex >= TeacherData.length? true: false} onClick={CounterInce} className={`${TeacherListStyle.arrow__buttons}`}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </div>
            </div>
        }
        </Cards>
    </div>
    )
}

export default ListTeacher
