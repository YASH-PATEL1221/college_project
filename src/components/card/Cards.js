import React from 'react';
import style from "../../css/Cards/cards.module.css";


function Cards(props) {
  return (
    <div className={`${style.body} ${props.className}`} style={{height:`${props.height}`,width:`${props.width}`}}>
      {props.children}
    </div>
  )
}

export default Cards
