import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { axiosInstance } from "./axios";
import { Spinner } from '@chakra-ui/react';

export const PrivateRoutes = ({children, role}) => {

    const [isAuth, setIsAuth] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const checkAuth = async () => { 
    try {
      const token = `Bearer ${sessionStorage.getItem("token")}`
        const response = await axiosInstance.get("/user", {
          headers:{
            Authorization : token
          }
        })
        setIsAuth(true)
        setUserRole(response.data.role)
    } catch (error) {
        setIsAuth(false)
        setUserRole(null)
    }
    };
    useEffect(() => {
      checkAuth();
    }, []);
    
    if(isAuth === null && userRole===null) return (
    <div className='text-3xl h-screen font-bold text-blue-900 flex items-center justify-center'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
      />
    </div>
    )

  
    return (isAuth && userRole === role ? children : <Navigate to='/'/>)
  
}