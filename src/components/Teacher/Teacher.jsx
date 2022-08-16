import React from 'react';
import { Route , Routes } from "react-router-dom";

import AddTeacher from './AddTeacher';


function Teacher() {
  return (
    <div>
      <Routes>
        <Route path="add" element={<AddTeacher/>}/>
      </Routes>
    </div>
  )
}

export default Teacher
