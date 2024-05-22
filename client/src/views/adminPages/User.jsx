import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axios';

const User = () => {

  const [userInfos, setUserInfos] = useState({});
  
  const fetchData = async () => {
    try {
        const response = await axiosInstance.get(`/users/${sessionStorage.getItem('id')}`);
        console.log('Response:', response.data);
        setUserInfos(response.data);
    } catch (error) {
        console.error('There was an error submitting the form!', error);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log(userInfos);;
  }, [userInfos]);
  return (
    <div>
      <h1>User Information</h1>
      {Object.entries(userInfos).map(([key, value]) => (
        <p key={key}><strong>{key}:</strong> {value}</p>
      ))}
    </div>
  )
}

export default User
