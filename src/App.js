import "./App.css";

import Master from "./components/Master/Master.jsx";
import AddTeacher from "./components/Teacher/AddTeacher";
import ListTeacher from "./components/Teacher/ListTeacher";

import ListStudent from "./components/Student/ListStudent";
import AddStudent from "./components/Student/AddStudent";

import ListCourse from "./components/course/ListCourse";
import AddCourse from "./components/course/AddCourse";

import AddLibraray from "./components/Library/AddLibraray";
import ListLibrary from "./components/Library/ListLibrary";

import Main from "./components/Main/Main";
import Login from "./Login";

import User from "./components/GetToken.js"

import React,{useEffect} from "react";

import { Route , Routes} from "react-router-dom"
import Logout from "./Logout";

import Form from "./components/Form";

function App() {
  const inputs = [
    {
      type:"text",
      name:"email",
      id:null
    },
    {
      type:"text",
      name:"email",
      id:null
    },
    {
      type:"text",
      name:"email",
      id:null
    },
    {
      type:"text",
      name:"email",
      id:null
    },
  ]

  // function Load(){
  //   console.log(User[0]);
  //   if(User[0]){
  //     window.location.href = `${User[0]}`;
  //   }
  // }

  // useEffect(() => {
  //   Load();
  // }, []);
 
  return (
    <div>
      <Routes>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Master page={<Main/>}/>}/>
        <Route path="/teachers/">
            <Route path="add" element={<Master page={<AddTeacher/>}/>}/>
            <Route path="list" element={<Master page={<ListTeacher/>}/>}/>
        </Route>
        <Route path="/student/">
            <Route path="add" element={<Master page={<AddStudent/>}/>}/>
            <Route path="list" element={<Master page={<ListStudent/>}/>}/>
        </Route>
        <Route path="/courses/">
            <Route path="add" element={<Master page={<AddCourse/>}/>}/>
            <Route path="list" element={<Master page={<ListCourse/>}/>}/>
        </Route>
        <Route path="/library/">
            <Route path="add" element={<Master page={<AddLibraray/>}/>}/>
            <Route path="list" element={<Master page={<ListLibrary/>}/>}/>
        </Route>

        <Route path="/form" element={<Master page={<Form method={"POST"} inputs={inputs} FromName="Form"/>}/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
