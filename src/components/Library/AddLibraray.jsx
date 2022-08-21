import React,{useReducer,useState} from 'react';

import BookAddStyle from "../../css/Books/books.add.module.css"

import Cards from "../card/Cards";

import Button from '@mui/material/Button';
import PORT from '../../PORT';
import axios from 'axios';

function reducer(state,action){

  switch(action.name){
    case "Author":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,Author:{...state.Author,[action.name]:action.value,isValid:true}}
      }
      return {...state,Author:{...state.Author,[action.name]:action.value,isValid:false}}
    
    case "Availability":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,Availability:{...state.Availability,[action.name]:action.value,isValid:true}}
      }
      return {...state,Availability:{...state.Availability,[action.name]:action.value,isValid:false}}

    case "Title":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,Title:{...state.Title,[action.name]:action.value,isValid:true}}
      }
      return {...state,Title:{...state.Title,[action.name]:action.value,isValid:false}}

    case "Price":
      if(/^[0-9]+$/.test(action.value)){
        return {...state,Price:{...state.Price,[action.name]:action.value,isValid:true}}
      }
      return {...state,Price:{...state.Price,[action.name]:action.value,isValid:false}}

    case "bid":
      if(/^[B]+[0-9]{4,4}/.test(action.value) && action.value.length === 5){
        return {...state,bid:{...state.bid,[action.name]:action.value,isValid:true}}
      }
      return {...state,bid:{...state.bid,[action.name]:action.value,isValid:false}}
    default:
      return {...state}
  }
}

function AddLibrary() {

const InitialState = {
    bid:{
      bid:"",
      isValid:true
    },
    Author:{
      Author:"",
      isValid:true
    },
    Title:{
      Title:"",
      isValid:true
    },
    Price:{
      Price:"",
      isValid:true
    },
    Availability:{
      Availability:"",
      isValid:true
    }
}



const [BookData,dispatch] = useReducer(reducer,InitialState);

const [BookID, setBookID] = useState(true);


function textChanged(e){
    const action = {
      name: e.target.name,
      value: e.target.value,
    }

    dispatch(action);
}

function isBookID_Available(e){
  axios.get(`http://localhost:${PORT}/sms/api/course/isCourseID_Available.php?bid=${e.target.value}`)
  .then(data => {
    setBookID(data.data.is_Available);
  })
}

  return (
    <div className={`${BookAddStyle.body}`}>
      <Cards width="95%" height="max-content" className={BookAddStyle.content}>
        <p className={`${BookAddStyle.label}`}>
          Add Student
        </p>

        <p className={`${BookAddStyle.book_id_available} ${BookID ? BookAddStyle.hide : " "}`}>Book id not available</p>
        <form action="http://localhost:8000/sms/api/library/add_books.php" name='form' method="post" >
          <div className={`${BookAddStyle.form}`}>
            <div className={`${BookAddStyle.section}`}>

              {/* bid */}
              <input placeholder='Book ID'  type="text" name="bid" id="" 
                className={`${BookAddStyle.name} ${BookAddStyle.input} ${BookAddStyle.bid} ${(BookData.bid.isValid && BookID) ? `${BookAddStyle.valid}`:`${BookAddStyle.not_valid}`} input`} 
                onChange={textChanged} onKeyUp={isBookID_Available} value={BookData.bid.bid}/>

              {/* Student name */}
              <input placeholder='Student name'  type="text" name="Author" id="" 
              className={`${BookAddStyle.Author}  ${BookAddStyle.input} ${BookData.Author.isValid ? `${BookAddStyle.valid}`:`${BookAddStyle.not_valid}`} input`} 
              onChange={textChanged} value={BookData.Author.Author}/>
            </div>

            <div className={`${BookAddStyle.section}`}>
              {/* avaiability */}
              <input placeholder='Avaiability'  type="text" name="Availability" id="" 
                className={`${BookAddStyle.name} ${BookAddStyle.input} ${BookAddStyle.Availability} ${BookData.Availability.isValid ? `${BookAddStyle.valid}`:`${BookAddStyle.not_valid}`} input`} 
                onChange={textChanged} value={BookData.Availability.Availability}/>

              {/* title */}
              <input placeholder='Book title'  type="text" name="Title" id="" 
                className={`${BookAddStyle.name} ${BookAddStyle.input} ${BookAddStyle.Title} ${BookData.Title.isValid ? `${BookAddStyle.valid}`:`${BookAddStyle.not_valid}`} input`} 
                onChange={textChanged} value={BookData.Title.Title}/>
            </div>
            
            <div className={`${BookAddStyle.section}`}>
              {/* Price */}
              <input placeholder='Price'  type="text" name="Price" id="" 
                className={`${BookAddStyle.name} ${BookAddStyle.input} ${BookAddStyle.Price} ${BookData.Price.isValid ? `${BookAddStyle.valid}`:`${BookAddStyle.not_valid}`} input`} 
                onChange={textChanged} value={BookData.Price.Price}/>
            </div>


            <div className={`${BookAddStyle.buttons}`}>

              <Button varient="contained" type='submit' name="submit" className={`${BookAddStyle.button}`} color={"success"} disabled={
                
                  !(
                    (BookData.Author.isValid && (BookData.Author.Author.length > 0)) &&
                    (BookData.bid.isValid && (BookData.bid.bid.length > 0 && BookID)) &&
                    (BookData.Availability.isValid && (BookData.Availability.Availability.length > 0)) &&
                    (BookData.Title.isValid && (BookData.Title.Title.length > 0)) &&
                    (BookData.Price.isValid && (BookData.Price.Price.length > 0))
                  )
                  }>
                  Submit
                  <input type="submit" className='submit_button' name='submit_button' value="Submit" hidden />
              </Button>
              <Button className={`${BookAddStyle.button}`} type="reset" color={"primary"}>
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

export default AddLibrary;