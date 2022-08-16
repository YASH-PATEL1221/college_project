import React from 'react';

import MainStyle from "../../css/main/main.module.css";

import Content from "./Content.jsx"

function Main() {
  return (
    <div className={`${MainStyle.body}`}>
        <Content/>
    </div>
  )
}

export default Main
