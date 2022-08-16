import axios from 'axios'
import React,{useEffect} from 'react'

function Logout() {
    useEffect(() => {
        axios.get("http://localhost:3001/logout")
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Logout
