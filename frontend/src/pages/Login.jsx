import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <div className="container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <p>New user? <Link to="/register">Register</Link></p>
    </div>
    </div>
  )
}

export default Login
