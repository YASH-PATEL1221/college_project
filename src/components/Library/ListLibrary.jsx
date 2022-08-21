import PORT from '../../PORT.js'

import React,{useEffect,useState} from 'react';
import axios from 'axios';

import Cards from '../card/Cards';
import Table from 'react-bootstrap/esm/Table';

import BooksListStyle from "../../css/Books/Books.list.module.css";


import TableRows from './TableRows';
import DeleteLibrary from './DeleteLibrary.jsx';
import UpdateLibrary from "./UpdateLibrary.jsx"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

function ListLibrary() {
    // DISPLAY ONLY SPECIFIC NO OF ROWS ON USER INPUT OR SELECT
    const [BooksData, setBooksData] = useState([]);
    // const [viewBookss, setviewBookss] = useState([]);

    const [Counter, setCounter] = useState(1);          // COUNTER STATE
    const [PerPage, setPerPage] = useState(5);          // SET ROWS PER PAGE
    const [StartIndex, setStartIndex] = useState(0);    // SATRTING INDEX

    let viewBooks;

    let no_of_rows_per_page = PerPage;
    let EndIndex = no_of_rows_per_page * Counter;       // ENDING INDEX

    // SLICING ARRAY BASE ON NO OF ROWS PER PAGE
    if(BooksData.length > 0){
        viewBooks = BooksData.slice(StartIndex,EndIndex);
    }
    
    console.log(StartIndex,EndIndex);

    // SEARCH TEXT IN NAME COLUMN
    function ShowRows(e){
        let value = e.target.value;
        let rows = document.querySelectorAll(".rows");
        rows.forEach(row => {
            console.log(row.childNodes[1]);
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
        axios.get(`http://localhost:${PORT}/sms/api/library/get_books.php`)
        .then(data => setBooksData(data.data.data));
    }, []);



    const [SendingData, setSendingData] = useState({status:null});

    const Update_popup = (data) => {
        setSendingData(data);
    };


    return (
    <div className={`${BooksListStyle.body}`}>

        {/* TO DISPLAY POPUP TO USER TO UPDATE Books`S DATA*/}
        {console.log(SendingData.status)}

        {SendingData.status === true ? <UpdateLibrary data={SendingData}/>:<></>} {/*  conditional rendring of update student */}
        {SendingData.status === false ? <DeleteLibrary data={SendingData}/>:<></>} {/*  conditional rendring of delete student */}
        

        {/* RENDERING SEARCH BAR */}
        <Cards height="max-content" width="96%" className={`${BooksListStyle.Books__style}`}>
        <div className={`${BooksListStyle.heading}`}>
            <p>Books</p>
            <input type="text" name="" id="" onChange={ShowRows} placeholder='Search'/>
        </div>
        {/* SHOW TABLE */}
        {BooksData.length <= 0 ? <p className={`${BooksListStyle.no_records}`}>No records found</p>: 
        
                    <Table className={`${BooksListStyle.table}`}>
                        <thead>
                            <tr>
                                <td>Book ID</td>
                                <td>Author</td>
                                <td>Title</td>
                                <td>Price</td>
                                <td>Availability</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody className={`${BooksListStyle.table_body}`}>
                            {/* ITERATE THROUCH VIEWBookss ARRAY  */}
                            {
                                viewBooks.map((d,index) => {
                                    return(
                                        <TableRows 
                                            bid={`${d.book_id}`}
                                            Update_popup={Update_popup}
                                            key={index} 
                                            Title={`${d.title}`}
                                            Author={`${d.author}`}
                                            Price={`${d.price}`}
                                            Availability={`${d.availability}`}
                                        />
                                    )
                                })
                            }

                        </tbody>
                    </Table>
        }

        {/* CONTROL NO. OF ITEMS PER PAGE */}
        {BooksData.length <= 0 ? <></>: 
        
            <div className={`${BooksListStyle.show_items}`}>
                <div className={`${BooksListStyle.section1}`}>
                    <p>items per page</p>
                    <select onChange={Items_per_page} className={`${BooksListStyle.num_of_rows}`}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className={`${BooksListStyle.section2}`}>
                    <p>1 - {EndIndex} of {BooksData.length}</p>
                </div>
                <div className={`${BooksListStyle.section3}`}>
                    <IconButton disabled={StartIndex === 0 ? true: false} onClick={CounterDece} className={`${BooksListStyle.arrow__buttons}`}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <IconButton disabled={EndIndex >= BooksData.length? true: false} onClick={CounterInce} className={`${BooksListStyle.arrow__buttons}`}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </div>
            </div>
        }
        </Cards>
    </div>
    )
}

export default ListLibrary;
