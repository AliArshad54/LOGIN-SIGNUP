import React, { useState } from 'react'
import axios from 'axios';
import { NavLink,useNavigate } from 'react-router-dom';
const signin = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loggedin,setLoggedIn]=useState(null);
    const navigate=useNavigate();
    axios.defaults.withCredentials=true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/signin', { email, password });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name',response.data.name)
          navigate('/user');
        } catch (error) {
            setLoggedIn('Invalid email or password. Please Create an account.');
          console.error('Error signing in:', error);
        }
      };
  return (
    <>

   <div className="Container">
    {loggedin&&<p>{loggedin}</p>}
    <h2>Login</h2>
    <form onSubmit={handleSubmit}> 
        <label htmlFor="Email">
            Email
        </label>
        <input type='email' id='Email' placeholder='Enter Your Email' onChange={e=>setEmail(e.target.value)} required/>
        <label htmlFor="password">
            Password
        </label>
        <input type='password'id='password' placeholder='Enter Your  Password' onChange={e=>setPassword(e.target.value)} required/>
        <button type='submit'  value="submit" > Submit</button>
    </form>
   </div>
   <p style={{marginLeft:"670px"}}>  Have No Account <NavLink to='/signup'>SignUp</NavLink> </p>
    </>   
  )
}
export default signin