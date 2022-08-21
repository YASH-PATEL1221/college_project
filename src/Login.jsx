import React,{useReducer} from 'react';

import LoginStyle from "./css/login/login.module.css";
// import Form from "./components/Form.jsx"

function reducer(state,action){
    console.log(state);
    switch (action.name) {
      case "name":
        if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(action.value)){
            return {...state,name:{...state.name,[action.name]:action.value,isValid:true}}
        }
        return {...state,name:{...state.name,[action.name]:action.value,isValid:false}}

      case "password":
        if(action.value.length > 0){
          return {...state,password:{...state.password,[action.name]:action.value,isValid:true}}
        }
        return {...state,password:{...state.password,[action.name]:action.value,isValid:false}}

      default:
        return {...state}
    }
}

function Login() {
  
  const initialState = {
    name:{
      name:"",
      isValid:true
    },
    password:{
      password:"",
      isValid:true
    }
  }


  const [FormData,dispatch] = useReducer(reducer,initialState);

  function validator(e){
    const action = {
      name:e.target.name,
      value:e.target.value
    }

    dispatch(action);
  } 
  
  return (
    <div className={`${LoginStyle.body}`}>
        <form action="http://localhost:3001/login" method="post" className={`${LoginStyle.form}`}>
        <p className={`${LoginStyle.sigin}`}>Sign in</p>
            <input defaultValue={FormData.name.name} className={`${LoginStyle.inputs} ${FormData.name.isValid ? LoginStyle.valid: LoginStyle.invalid }`} onKeyUp={validator} type="text" name="name" id="" />
            <input defaultValue={FormData.password.password} className={`${LoginStyle.inputs} ${FormData.password.isValid ? LoginStyle.valid: LoginStyle.invalid }`}  onKeyUp={validator} type="password" name="password" id="" />
           
            <button type="submit" disabled={!(((FormData.name.isValid && FormData.password.isValid)) && ((FormData.name.name.length > 0 && FormData.password.password.length > 0)))} 
            className={`${LoginStyle.button} ${((FormData.name.isValid && FormData.password.isValid)) && 
            ((FormData.name.name.length > 0 && FormData.password.password.length > 0))? LoginStyle.disabled: LoginStyle.notdisabled}`}
            value="Login" >
              Login
            </button>
        </form>
    </div>
  )
}

export default Login
