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


import { Route , Routes } from "react-router-dom"
import Logout from "./Logout";

function App() {
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
      </Routes>
      
    </div>
  );
}

export default App;
