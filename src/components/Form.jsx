import React,{useState} from 'react';

function Form() {
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");

    function NameChange(e){
        setName(e.target.value);
    }

    function AddressChange(e){
        setAddress(e.target.value);
    }

    function ShowData(){
        alert(Name);
        alert(Address);
    }

    return (
        <div>
            <form action="" onSubmit={ShowData}>
                <input type="text" name="" onChange={NameChange}/>
                <input type="text" name="" onChange={AddressChange}/>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Form
