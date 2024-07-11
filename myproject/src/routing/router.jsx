import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from '../components/User/dashboard/home'

import User from '../components/user'
import Post from '../components/Post/Post'
import Setting from '../components/Setting/setting'
import '../assets/index.css'
import signin from '../Registration/signin'
import signup from '../Registration/signup'
 const router = () => {
  return (
    <>
    <Routes>
        <Route exact path='/user' Component={User}/>
        <Route exact path='/post' Component={Post}/>
        <Route exact path='/setting' Component={Setting}/>
<Route exact path='/' Component={Home}/>
<Route exact path='/signin' Component={signin}/>
<Route exact path='/signup' Component={signup}/>
</Routes>
    </>
   )
}
export default router