import PORT from '../../PORT.js'

import React,{useEffect,useState} from 'react';
import axios from 'axios';

import Cards from '../card/Cards';
import Table from 'react-bootstrap/esm/Table';

import StudentListStyle from "../../css/students/student.list.module.css";


import TableRows from './TableRows';
import UpdateStudent from './UpdateStudent.jsx';
import DeleteStudent from './DeleteStudent.jsx';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';


function Liststudent() {
    // DISPLAY ONLY SPECIFIC NO OF ROWS ON USER INPUT OR SELECT
    const [StudentData, setStudentData] = useState([]);
    // const [viewStudents, setviewStudents] = useState([]);

    const [Counter, setCounter] = useState(1);          // COUNTER STATE
    const [PerPage, setPerPage] = useState(5);          // SET ROWS PER PAGE
    const [StartIndex, setStartIndex] = useState(0);    // SATRTING INDEX
    const [ID,setID] = useState("");

    let viewStudents;

    let no_of_rows_per_page = PerPage;
    let EndIndex = no_of_rows_per_page * Counter;       // ENDING INDEX

    // SLICING ARRAY BASE ON NO OF ROWS PER PAGE
    if(StudentData.length > 0){
        viewStudents = StudentData.slice(StartIndex,EndIndex);
    }
    
    // console.log(StartIndex,EndIndex);

    // SEARCH TEXT IN NAME COLUMN
    function ShowRows(e){
        let value = e.target.value;
        let rows = document.querySelectorAll(".rows");
        rows.forEach(row => {
            if(row.childNodes[2].innerText.toUpperCase().includes(value.toUpperCase())){
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
        // console.log("getting data....");
        axios.get(`http://localhost:${PORT}/sms/api/student/get_students.php`)
        .then(data => setStudentData(data.data.data));
    }, []);



    const [SendingData, setSendingData] = useState({status:null});

    const Update_popup = (data) => {
        setSendingData(data);
    };

    // console.log(StudentData);


    return (
    <div className={`${StudentListStyle.body}`}>

        {/* TO DISPLAY POPUP TO USER TO UPDATE student`S DATA*/}
        {/* {console.log(SendingData.status)} */}

        {/* {SendingData.status !== null} */}

        {SendingData.status === true? <UpdateStudent data={SendingData} />:<></>} {/* conditional rendring of update student*/}
        {SendingData.status === false ? <DeleteStudent data={SendingData}/>:<></>} {/*  conditional rendring of delete student */}

        {/* RENDERING SEARCH BAR */}
        <Cards height="max-content" width="96%" className={`${StudentListStyle.student__style}`}>
        <div className={`${StudentListStyle.heading}`}>
            <p>student</p>
            <input type="text" name="" id="" onChange={ShowRows} placeholder='Search'/>
        </div>
        {/* SHOW TABLE */}
        {StudentData.length <= 0 ? <p className={`${StudentListStyle.no_records}`}>No records found</p>: 
        
                    <Table className={`${StudentListStyle.table}`}>
                        <thead>
                            <tr>
                                <td>Images</td>
                                <td>roll_no</td>
                                <td>Name</td>
                                <td>Mobile</td>
                                <td>Email</td>
                                <td>admission_date</td>
                                <td>Gender</td>
                                <td>Date of Birth</td>
                                <td>Address</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody className={`${StudentListStyle.table_body}`}>
                            {/* ITERATE THROUCH VIEWStudents ARRAY  */}
                            {
                                viewStudents.map((d,index) => {
                                    return(
                                        <TableRows 
                                            cid={`${d.CID}`} 
                                            sid={`${d.SID}`}
                                            Update_popup={Update_popup}
                                            Image={<Avatar src={require('../../asset/person.jpg')} />} 
                                            key={index} 
                                            Name={`${d.student_name}`} 
                                            Mobile={`${d.phone_no}`} 
                                            Email={`${d.email}`} 
                                            Gender={`${d.gender}`} 
                                            admission_date={`${d.admission_date}`}
                                            roll_no={`${d.roll_no}`}
                                            dob={`${d.dob}`}
                                            address={`${d.address}`}
                                        />
                                    )
                                })
                            }

                        </tbody>
                    </Table>
        }

        {/* CONTROL NO. OF ITEMS PER PAGE */}
        {StudentData.length <= 0 ? <></>: 
        
            <div className={`${StudentListStyle.show_items}`}>
                <div className={`${StudentListStyle.section1}`}>
                    <p>items per page</p>
                    <select onChange={Items_per_page} className={`${StudentListStyle.num_of_rows}`}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className={`${StudentListStyle.section2}`}>
                    <p>1 - {EndIndex} of {StudentData.length}</p>
                </div>
                <div className={`${StudentListStyle.section3}`}>
                    <IconButton disabled={StartIndex === 0 ? true: false} onClick={CounterDece} className={`${StudentListStyle.arrow__buttons}`}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <IconButton disabled={EndIndex >= StudentData.length? true: false} onClick={CounterInce} className={`${StudentListStyle.arrow__buttons}`}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </div>
            </div>
        }
        </Cards>
    </div>
    )
}

export default Liststudent
