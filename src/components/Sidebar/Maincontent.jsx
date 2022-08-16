import React,{useState} from 'react';

import MaincontentStyle from "../../css/maincontent/maincontent.module.css";

import {NavLink} from "react-router-dom";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Maincontent(props) {
    const [Toggle, setToggle] = useState(false);

    const setDropDown = () => setToggle(!Toggle);

    return (
        <>
            <div className={`${MaincontentStyle.Each_content} ${Toggle ? MaincontentStyle.dark:""}`} onClick={setDropDown}>
                <div className={`${MaincontentStyle.section1}`}>
                    {props.Icon[0]}
                    <p>{props.list}</p>
                </div>
                {Toggle ? props.Icon[2] : props.Icon[1]}
            </div>

            <div className={`${MaincontentStyle.all_lists} ${Toggle ? MaincontentStyle.show : MaincontentStyle.hide}`}>
                <ul>
                    {
                        props.list_items.map((list,index) => {
                            return (
                                <NavLink
                                    key={index}
                                    to={`${list.link}`}
                                    className={`${MaincontentStyle.links}`}
                                >
                                    <li id={index}><ArrowForwardIosIcon className={`${MaincontentStyle.arrow}`}/>{list.list}</li>
                                </NavLink>
                            );
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Maincontent
