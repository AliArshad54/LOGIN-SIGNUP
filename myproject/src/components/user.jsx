import React, { useState, useEffect } from 'react';
import NavigationBar from './User/dashboard/NavigationBar';
import Header from '../components/header';
import axios from 'axios';
import '../assets/index.css'
const User = () => {

const [userData,setUserName]=useState('');
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }
      const userName=localStorage.getItem('user');
      if(userName){
const userData=JSON.parse(userName);
const parseUserData=JSON.parse(userData.config.data);
setUserName(parseUserData);
      }
      try {
        const response = await axios.get('http://localhost:3000/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Error fetching user');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <NavigationBar />
      <div className="User">
        <div className="userContainer">
          <h2>Welcome-{userData.name}</h2>
          <p>Email: { userData.email}</p>
        </div>
      </div>
    </>
  );
};

export default User;
