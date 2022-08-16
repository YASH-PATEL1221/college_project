import React from 'react'

function Login() {
  return (
    <div>
        <form action="http://localhost:3001/login" method="post">
            <input type="text" name="name" id="" />
            <input type="password" name="password" id="" />
            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default Login
