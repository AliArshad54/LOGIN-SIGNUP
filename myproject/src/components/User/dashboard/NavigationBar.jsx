import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../../assets/index.css'
const NavigationBar = () => {
  return (
    <>
   <div className="navigationbar">
    <ul className='navigation'> 
<NavLink to='/user' className='NavItem' >User</NavLink>
<NavLink to='/post' className='NavItem' >Post</NavLink>
<NavLink to='/setting' className='NavItem'>Setting</NavLink>
</ul>
</div>
  </>
  )
 }

export default NavigationBar