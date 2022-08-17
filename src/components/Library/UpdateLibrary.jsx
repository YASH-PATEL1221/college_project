import PORT from "../../PORT.js"

import React,{useState,useReducer} from 'react';

import LibraryUpdateStyle from "../../css/Books/Library.update.module.css";  

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

function reducer(state,action){

  
  switch(action.name){
    case "Title": 
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,Title:{...state.Title,[action.name]:action.value,isValid:true}};
      }
      return {...state,Title:{...state.Title,[action.name]:action.value,isValid:false}};

    case "Author":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,Author:{...state.Author,[action.name]:action.value,isValid:true}};
      }
      return {...state,Author:{...state.Author,[action.name]:action.value,isValid:false}};

    case "Price":
      // console.log({...state,Price:{...state.Price,[action.name]:action.value}});
      if(/^[0-9]+$/.test(action.value)){
        
        return {...state,Price:{...state.Price,[action.name]:action.value,isValid:true}};
      }
      return {...state,Price:{...state.Price,[action.name]:action.value,isValid:false}};

    case "Availability":
      if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
        return {...state,Availability:{...state.Availability,[action.name]:action.value,isValid:true}};
      }
      return {...state,Availability:{...state.Availability,[action.name]:action.value,isValid:false}};

    default:
      return {...state};
  }
}




function UpdateTeacher({data}) {
  const [ToggleDisplay, setToggleDisplay] = useState(true);

  function displayNone(){
    setToggleDisplay(!ToggleDisplay);
    window.location.reload(true);
  }

  const [UpdateData, setUpdateData] = useState(data);


  const InitialState = {
    bid:{
      bid:UpdateData.bid,
      isValid:false
    },
    Title:{
      Title:UpdateData.Title,
      isValid:false
    },
    Author:{
      Author:UpdateData.Author,
      isValid:false
    },
    Price:{
      Price:UpdateData.Price,
      isValid:false
    },
    Availability:{
      Availability:UpdateData.Availability,
      isValid:false
    }
  }

  
  const [FormData,dispatch] = useReducer(reducer,InitialState);
  
  function TextChanged(e){
    const action = {
      name:e.target.name,
      value:e.target.value
    }
    dispatch(action);
  }

  
  return (
    <div className={`${LibraryUpdateStyle.body} ${ToggleDisplay ? LibraryUpdateStyle.show:LibraryUpdateStyle.none}`}>
        <div className={`${LibraryUpdateStyle.popup}`}>
          <div className={`${LibraryUpdateStyle.header}`}>
            <div className={`${LibraryUpdateStyle.left}`}>
            </div>
            <div className={`${LibraryUpdateStyle.right}`}>
              <IconButton onClick={displayNone}>
                <CloseIcon className={`${LibraryUpdateStyle.close}`}/>
              </IconButton>
            </div>
          </div>

          <form  action={`http://localhost:${PORT}/sms/api/library/update_books.php`} id='form' method="post" className={`${LibraryUpdateStyle.form}`}>
            <input type="text" hidden name="bid" defaultValue={`${FormData.bid.bid}`} id="" />

            <div className={`${LibraryUpdateStyle.row1}`}>
              <input type="text"  onChange={TextChanged} className={`${LibraryUpdateStyle.input} ${FormData.Title.isValid ? LibraryUpdateStyle.valid: LibraryUpdateStyle.not_valid}`} defaultValue={`${FormData.Title.Title}`} name="Title" id="" />
              <input type="text" onChange={TextChanged} className={`${LibraryUpdateStyle.input} ${FormData.Author.isValid ? LibraryUpdateStyle.valid: LibraryUpdateStyle.not_valid}`} defaultValue={`${FormData.Author.Author}`} name="Author" id="" />
            </div>

            <div className={`${LibraryUpdateStyle.row1}`}>
              <input type="text" onChange={TextChanged} className={`${LibraryUpdateStyle.input} ${FormData.Price.isValid ? LibraryUpdateStyle.valid: LibraryUpdateStyle.not_valid}`} defaultValue={`${FormData.Price.Price}`} name="Price"/>
              <input type="text" onChange={TextChanged} className={`${LibraryUpdateStyle.input} ${FormData.Availability.isValid ? LibraryUpdateStyle.valid: LibraryUpdateStyle.not_valid}`} defaultValue={`${FormData.Availability.Availability}`} name="Availability" id="" />
            </div>

            <div className={`${LibraryUpdateStyle.buttons}`}>
              <Button className={`${LibraryUpdateStyle.button}`} type="submit" color="primary" disabled={
                FormData.Title.isValid &&
                FormData.Author.isValid && 
                FormData.Price.isValid &&
                FormData.Availability.isValid ?
                false : true
              }>
                Submit
                <input hidden type="submit" value="Submit" />
              </Button>

              <Button className={`${LibraryUpdateStyle.button}`}  onClick={displayNone} color="error">
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
