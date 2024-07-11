import React, { useEffect } from 'react'
import NavigationBar from './NavigationBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    axios.get('http:localhost:3000').then(response=>{
      console.log(response);
      if(response.data!=="Success"){
navigate('/signin');
      }
    })
  })
  return (
   <>
   <div className="leftSideNav">
<NavigationBar/>
   </div>
   </>
  )
}

export default home