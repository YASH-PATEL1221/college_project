import React from 'react';

import FormStyle from "../css/form/form.module.css";
import Cards from './card/Cards';

function Form({method,inputs,FromName,action}) {

    return (
       <div className={`${FormStyle.body}`}>
            <Cards width="95%" height="max-content" >
                <form action={`${action}`} method={`${method}`}>
                    <p>
                        {FromName}
                    </p>
                    <div>
                        {
                            inputs.map(input => {
                                return(
                                    <input type={`${input.type}`} name={`${input.name}`} id={`${input.id}`}/>
                                );
                            })
                        }
                    </div>
                </form>
            </Cards>
       </div>
    )
}

export default Form
