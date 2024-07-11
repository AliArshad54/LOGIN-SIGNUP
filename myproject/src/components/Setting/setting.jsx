import React from 'react'
import Header from '../header'
import NavigationBar from '../User/dashboard/NavigationBar'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const setting = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const token = localStorage.getItem('token');
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user',{
        headers: {
          headers: { Authorization: `Bearer ${token}` },
        }
      });

      setUser(response.data);
    }catch(err){
      console.log(err);
    }
  }
  fetchUser();
},[]
)
const logoutHandle=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigate('/');
}
if (darkMode) {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.remove('dark-mode');
}

  return (
   <>
   <Header/>
   <NavigationBar/>
   <div className="settingSection">
   <h2>
    <img src="https://scontent.flhe9-1.fna.fbcdn.net/v/t39.30808-1/439098363_122138768894166081_2403204723590323445_n.jpg?stp=c0.0.40.40a_cp0_dst-jpg_p40x40&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=8IPXZuU1DBEQ7kNvgGe9NBg&_nc_ht=scontent.flhe9-1.fna&oh=00_AYA1MIQ1OJB7bt7uqzFR8MDJrgkrLQB3bQjxbMTustiR3w&oe=66608D90" alt="" style={{borderRadius:"49%"}}/>
   {user&&user[0].name}</h2>
   <h4 onClick={logoutHandle}>Logout</h4>
   <div className="App">
      <div className="toggle-container">
        <input type="checkbox" id="dark-mode-toggle" checked={darkMode} onChange={toggleDarkMode} />
        <label htmlFor="dark-mode-toggle" className="toggle-label">Dark Mode</label>
      </div>
    </div>
   </div>
   </>
  )
}

export default setting